import { graphqlOperation } from '@aws-amplify/api'
import { call, put, takeEvery, all, getContext, select } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import path from 'ramda/src/path'
import * as actions from 'store/ducks/posts/actions'
import * as queries from 'store/ducks/posts/queries'
import * as constants from 'store/ducks/posts/constants'
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'
import RNFS from 'react-native-fs' 
import * as Logger from 'services/Logger'
import filePath from 'path'

function initPostsCreateUploadChannel({ image, uploadUrl }) {
  const getName = (image) => {
    return filePath.basename(image, '.jpg')
  }

  const getFilename = (image) => {
    return filePath.basename(image)
  }

  const getFilepath = (image) => {
    return image
  }

  const getFiletype = (image) => {
    return 'image/jpeg'
  }

  const files = [{
    name: getName(image),
    filename: getFilename(image),
    filepath: getFilepath(image),
    filetype: getFiletype(image),
  }]

  const handleRequest = (emitter) => (response) => {
    const jobId = response.jobId
    emitter({ status: 'retry', progress: 0, jobId, })
  }

  const handleProgress = (emitter) => (response) => {
    const jobId = response.jobId
    const progress = parseInt(response.totalBytesSent / response.totalBytesExpectedToSend * 100, 10)

    if (progress % 10 === 0) {
      const nextProgress = progress === 100 ? 99 : progress
      emitter({ status: 'progress', progress: nextProgress, jobId })
    }
  }

  const handleSuccess = (emitter) => (response) => {
    const jobId = response.jobId
    emitter({ status: 'success', progress: 99, jobId })
    emitter(END)
  }

  const handleFailure = (emitter) => (error) => {
    console.log(error, 321)
    emitter({ status: 'failure', progress: 0 })
    emitter(END)
  }

  const initUpload = (emitter) => (begin, progress) =>
    RNFS.uploadFiles({
      binaryStreamOnly: true,
      toUrl: uploadUrl,
      files: files,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      begin,
      progress,
    })

  /**
   *
   */
  return eventChannel((emitter) => {
    const uploader = initUpload(emitter)(
      handleRequest(emitter),
      handleProgress(emitter)
    )

    const next = (response) => {
      if (response.statusCode === 200) {
        handleSuccess(emitter)(response)
      } else {
        handleFailure(emitter)(response)
      }
    }

    const fail = (error) => {
      handleFailure(emitter)(error)
    }

    uploader.promise
      .then(next)
      .catch(fail)

    return () => {
      RNFS.stopUpload(uploader.jobId)
    }
  })
}

function* handlePostsCreateRequest(payload) {
  const AwsAPI = yield getContext('AwsAPI')

  const data = yield (function* getPost() {
    try {
      const post = yield AwsAPI.graphql(graphqlOperation(queries.getPost, payload))
      if (!post.data.post) {
        throw new Error('Post must be created')
      }
      return post.data.post
    } catch (error) {
      const post = yield AwsAPI.graphql(graphqlOperation(queries.addPhotoPost, payload))
      return post.data.addPost
    }
  })()

  return {
    userId: data.postedBy.userId,
    imageUrl: data.imageUploadUrl,
    image: path(['images', 0])(payload),
  }
}

/**
 *
 */
function* handleTextOnlyPost(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.addTextOnlyPost, req.payload))
    const userIdSelector = path(['data', 'addPost', 'postedBy', 'userId'])
    const meta = { attempt: 1, progress: 100 }
  } catch (error) {
    yield put(actions.postsCreateFailure({
      message: errorWrapper(error),
      payload: req.payload,
      meta: { attempt: 0, progress: 0 },
    }))
  }
}

/**
 *
 */
function* handleImagePost(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield handlePostsCreateRequest(req.payload)

    const channel = yield call(initPostsCreateUploadChannel, {
      uploadUrl: data.imageUrl,
      image: data.image,
    })

    yield takeEvery(channel, function *(upload) {
      const meta = (nextProgress) => ({
        attempt: upload.attempt || req.payload.attempt,
        progress: nextProgress || parseInt(upload.progress, 10),
        error: upload.error,
        jobId: upload.jobId,
      })

      if (upload.status === 'progress') {
        yield put(actions.postsCreateProgress({ data: {}, payload: req.payload, meta: meta() }))
      }

      if (upload.status === 'success') {
        yield put(actions.postsCreateProgress({ data: {}, payload: req.payload, meta: meta(99) }))
      }

      if (upload.status === 'failure') {
        yield put(actions.postsCreateFailure({ data: {}, payload: req.payload, meta: meta(0) }))
      }
    })
  } catch (error) {
    yield put(actions.postsCreateFailure({
      message: errorWrapper(error),
      payload: req.payload,
      meta: { attempt: 0, progress: 0 },
    }))
  }
}

/**
 * 
 */
function* postsCreateRequest(req) {
  if (req.payload.postType === 'TEXT_ONLY') {
    return yield handleTextOnlyPost(req)
  }

  if (req.payload.postType === 'IMAGE') {
    return yield handleImagePost(req)
  }
}

/**
 * 
 */
function* postsCreateIdle(req) {
  const jobId = path(['payload', 'meta', 'jobId'])(req)

  if (jobId) {
    yield RNFS.stopUpload(jobId)
  }
}

/**
 * 
 */
function* postsCreateSchedulerRequest() {
  try {
    const data = yield select(state => state.posts.postsCreateQueue)
    
    const failedPosts = Object.values(data)
      .filter(post => path(['status'])(post) === 'failure')

    const loadingPosts = Object.values(data)
      .filter(post => path(['status'])(post) === 'loading')
      .filter(post => dayjs(dayjs()).diff(path(['payload', 'createdAt'])(post), 'minute') > 5)

    const idlePosts = Object.values(data)
      .filter(post => path(['status'])(post) === 'idle')

    const successPosts = Object.values(data)
      .filter(post => path(['status'])(post) === 'success')

    function* removePost(post) {
      yield put(actions.postsCreateIdle({
        payload: path(['payload'])(post),
      }))
      return post
    }

    function* createPost(post) {
      const postId = uuid()
      const mediaId = uuid()
      yield put(actions.postsCreateRequest({
        ...path(['payload'])(post),
        createdAt: dayjs().toJSON(),
        postId,
        mediaId,
      }))
      return post
    }

    function* storePost(post) {
      const source = path(['payload', 'images', '0'])(post)
      const desination = `${RNFS.DocumentDirectory}/REAL/${path(['payload', 'mediaId'])(post)}.jpg`
      return RNFS.copyFile(source, desination)
    }

    function* recreatePost(post) {
      yield removePost(post)
      yield createPost(post)
    }

    /**
     * Cleanup
     */
    yield all(
      successPosts.map((post) => call(removePost, post))
    )

    yield all(
      idlePosts.map((post) => call(removePost, post))
    )

    /**
     * Retry
     */
    yield all(
      loadingPosts
      .map((post) => call(recreatePost, post))
    )

    yield all(
      failedPosts
      .map((post) => call(recreatePost, post))
    )
  } catch (error) {
    Logger.withScope(scope => {
      scope.setExtra('message', error.message)
      Logger.captureMessage('POSTS_CREATE_SCHEDULER_REQUEST')
    })
  }
}

export default () => [
  takeEvery(constants.POSTS_CREATE_REQUEST, postsCreateRequest),
  takeEvery(constants.POSTS_CREATE_IDLE, postsCreateIdle),
  takeEvery(constants.POSTS_CREATE_SCHEDULER_REQUEST, postsCreateSchedulerRequest),
]