import { takeEvery, call, put, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as actions from 'store/ducks/cache/actions'
import * as constants from 'store/ducks/cache/constants'
import * as service from 'store/ducks/cache/service'

/**
 * 
 */
const progressCallback = (signature, emitter) => (data) => emitter({
  type: 'PROGRESS',
  payload: {
    signature,
    jobId: data.jobId,
    progress: parseInt(data.bytesWritten / data.contentLength * 100, 10),
  },
})

const beginCallback = (signature, emitter) => (data) => emitter({
  type: 'BEGIN',
  payload: {
    signature,
    jobId: data.jobId,
    progress: 0,
  },
})

const completeCallback = (signature, emitter) => (data) => emitter({
  type: 'COMPLETE',
  payload: {
    signature,
    jobId: data.jobId,
    progress: 100,
  },
})

/**
 * 
 */
function cacheFetchRequestChannel({ signature, priorityQueueInstance }) {
  return eventChannel(emitter => {
    service.priorotizedRemoteImageFetch({
      signature,
      queueInstance: priorityQueueInstance,
      progressCallback: progressCallback(signature, emitter),
      beginCallback: beginCallback(signature, emitter),
      completeCallback: completeCallback(signature, emitter),
    })

    /**
     * TODO: unsubscribe and stop remote image
     */
    return () => {}
  })
}

/**
 * 
 */
function* cacheFetchRequest(req) {
  /**
   * 
   */
  if (yield service.checkLocalImage(req.payload.signature.path)) {
    yield put(actions.cacheFetchSuccess({
      signature: req.payload.signature,
      jobId: undefined,
      progress: 100,
    }))
    return
  }

  const nextBuffer = yield select(state => state.cache.buffer[req.payload.signature.partial])
  if (nextBuffer) {
    return
  }

  /**
   * 
   */
  const channel = yield call(cacheFetchRequestChannel, {
    signature: req.payload.signature,
    priority: req.payload.priority,
    priorityQueueInstance: req.payload.priorityQueueInstance,
  })

  function* channelListener(eventData) {
    if (eventData.type === 'PROGRESS') {
      yield put(actions.cacheFetchProgress(eventData.payload))
    }
    if (eventData.type === 'BEGIN') {
      yield put(actions.cacheFetchProgress(eventData.payload))
    }
    if (eventData.type === 'COMPLETE') {
      yield put(actions.cacheFetchSuccess(eventData.payload))
    }
  }

  yield takeEvery(channel, channelListener)
}

export default () => [
  takeEvery(constants.CACHE_FETCH_REQUEST, cacheFetchRequest),
]