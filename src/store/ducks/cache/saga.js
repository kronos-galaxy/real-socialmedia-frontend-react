import { put, fork, take, actionChannel, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/cache/actions'
import * as constants from 'store/ducks/cache/constants'
import RNFS from 'react-native-fs'
import uuidv5 from 'uuid/v5'
import qs from 'query-string'

class Buffer {
  constructor() {
    this.queue = []
    this.length = 0
  }

  isEmpty() {
    return this.queue.length === 0
  }

  put(message) {
    this.queue.push(message)
    this.length = this.queue.length
  }

  take() {
    const msg = this.queue.shift()
    this.length = this.queue.length

    return msg
  }
}


const generateSignature = (source) => {
  if (typeof source !== 'string' || !source.length) {
    return {
      partial: '',
      path: '',
      isRemote: '',
    }
  }

  const parsed = qs.parseUrl(source)
  const partial = qs.parseUrl(source).url.split('cloudfront.net')[1]
  const uuid = uuidv5(partial || parsed.url, uuidv5.URL)
  const isRemote = source.includes('http://') || source.includes('https://')
  
  const path = isRemote ? `${RNFS.CachesDirectoryPath}/${uuid}.jpg` : source

  return {
    partial,
    path,
    isRemote,
  }
}

/**
 *
 */
function* handleCacheFetchRequest(payload) {
  if (typeof payload.source !== 'string' || !payload.source || !payload.source.includes('https://')) {
    return payload.source
  }

  const signature = generateSignature(payload.source)

  if (!signature.isRemote) {
    return signature
  }

  try {
    const exists = yield RNFS.exists(signature.path)
    if (!exists) {
      throw new Error('Image does not exist')
    }
  } catch (error) {
    const { promise } = RNFS.downloadFile({
      fromUrl: payload.source,
      toFile: signature.path,
      background: true,
      discretionary: true,
      cacheable: true,
      resumable: RNFS.resumeDownload,
      readTimeout: 10000,
      backgroundTimeout: 180000,
    })
    yield promise
  }

  return signature
}

/**
 * 
 */
function* cacheFetchSequentialRequest(buffer, action) {
  const channel = yield actionChannel(action)

  while (true) {
    const req = yield take(channel)
    try {
      const data = yield handleCacheFetchRequest(req.payload)
      yield put(actions.cacheFetchSuccess({ data }))
    } catch (error) {
      yield put(actions.cacheFetchFailure({ message: error.message }))
    }
  }
}

/**
 * 
 */
function* cacheFetchParallelRequest(req) {
  try {
    const data = yield handleCacheFetchRequest(req.payload)
    yield put(actions.cacheFetchSuccess({ data }))
  } catch (error) {
    yield put(actions.cacheFetchFailure({ message: error.message }))
  }
}

const buffer = new Buffer()

export default () => [
  fork(cacheFetchSequentialRequest, buffer, constants.CACHE_FETCH_REQUEST),
  fork(cacheFetchSequentialRequest, buffer, constants.CACHE_FETCH_480P_REQUEST),
  fork(cacheFetchSequentialRequest, buffer, constants.CACHE_FETCH_1080P_REQUEST),
  fork(cacheFetchSequentialRequest, buffer, constants.CACHE_FETCH_4K_REQUEST),

  takeEvery(constants.CACHE_FETCH_64P_REQUEST, cacheFetchParallelRequest),
]