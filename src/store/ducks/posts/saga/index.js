import { graphqlOperation } from '@aws-amplify/api'
import { put, takeLatest, getContext } from 'redux-saga/effects'
import path from 'ramda/src/path'
import compose from 'ramda/src/compose'
import omit from 'ramda/src/omit'
import * as actions from 'store/ducks/posts/actions'
import * as queries from 'store/ducks/posts/queries'
import * as constants from 'store/ducks/posts/constants'

/**
 *
 */
function* postsGetRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.getPosts, { ...req.payload, postStatus: 'COMPLETED' }))
    const dataSelector = path(['data', 'user', 'posts', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'user', 'posts']))

    yield put(actions.postsGetSuccess({ payload: req.payload, data: dataSelector(data), meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.postsGetFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

function* postsGetMoreRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.getPosts, { ...req.payload, postStatus: 'COMPLETED' }))
    const dataSelector = path(['data', 'user', 'posts', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'user', 'posts']))

    yield put(actions.postsGetMoreSuccess({ payload: req.payload, data: dataSelector(data), meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.postsGetMoreFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

function* postsViewsGetRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.viewedBy, req.payload))
    const dataSelector = path(['data', 'post', 'viewedBy', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'post', 'viewedBy']))

    yield put(actions.postsViewsGetSuccess({ payload: req.payload, data: dataSelector(data), meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.postsViewsGetFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}


function* postsLikesGetRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.onymouslyLikedBy, req.payload))
    const dataSelector = path(['data', 'post', 'onymouslyLikedBy', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'post', 'onymouslyLikedBy']))

    yield put(actions.postsLikesGetSuccess({ payload: req.payload, data: dataSelector(data), meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.postsLikesGetFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* postsFeedGetRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.getFeed, req.payload))
    const dataSelector = path(['data', 'self', 'feed', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'self', 'feed']))

    yield put(actions.postsFeedGetSuccess({ data: dataSelector(data), payload: req.payload, meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.postsFeedGetFailure({ message: errorWrapper(error), payload: req.payload, }))
  }
}

function* postsFeedGetMoreRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.getFeed, req.payload))
    const dataSelector = path(['data', 'self', 'feed', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'self', 'feed']))

    yield put(actions.postsFeedGetMoreSuccess({ data: dataSelector(data), payload: req.payload, meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.postsFeedGetMoreFailure({ message: errorWrapper(error), payload: req.payload, }))
  }
}

/**
 *
 */
function* postsGetArchivedRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.getPosts, { ...req.payload, postStatus: 'ARCHIVED' }))
    const selector = path(['data', 'user', 'posts', 'items'])

    yield put(actions.postsGetArchivedSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsGetArchivedFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

function* handlePostsEditRequest(payload) {
  const AwsAPI = yield getContext('AwsAPI')

  yield AwsAPI.graphql(graphqlOperation(queries.editPostExpiresAt, payload))
  yield AwsAPI.graphql(graphqlOperation(queries.editPostAlbum, payload))
  return yield AwsAPI.graphql(graphqlOperation(queries.editPost, payload))
}

/**
 *
 */
function* postsEditRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield handlePostsEditRequest(req.payload)
    const selector = path(['data', 'editPost'])

    yield put(actions.postsEditSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsEditFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsDeleteRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.deletePost, req.payload))
    const selector = path(['data', 'deletePost'])

    yield put(actions.postsDeleteSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsDeleteFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsArchiveRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.archivePost, req.payload))
    const selector = path(['data', 'archivePost'])

    yield put(actions.postsArchiveSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsArchiveFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsRestoreArchivedRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.restoreArchivedPost, req.payload))
    const selector = path(['data', 'restoreArchivedPost'])

    yield put(actions.postsRestoreArchivedSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsRestoreArchivedFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsFlagRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.flagPost, req.payload))
    const selector = path(['data', 'flagPost'])

    yield put(actions.postsFlagSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsFlagFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsSingleGetRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.getPost, req.payload))
    const selector = path(['data', 'post'])

    yield put(actions.postsSingleGetSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsSingleGetFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsOnymouslyLikeRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.onymouslyLikePost, req.payload))
    const selector = path(['data', 'onymouslyLikePost'])

    yield put(actions.postsOnymouslyLikeSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsOnymouslyLikeFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsAnonymouslyLikeRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.anonymouslyLikePost, req.payload))
    const selector = path(['data', 'anonymouslyLikePost'])

    yield put(actions.postsAnonymouslyLikeSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsAnonymouslyLikeFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsDislikeRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.dislikePost, req.payload))
    const selector = path(['data', 'dislikePost'])

    yield put(actions.postsDislikeSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsDislikeFailure({ message: errorWrapper(error), payload: req.payload, }))
  }
}

/**
 *
 */
function* postsReportPostViewsRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.reportPostViews, req.payload))
    const selector = path(['data', 'reportPostViews'])

    yield put(actions.postsReportPostViewsSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsReportPostViewsFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsGetTrendingPostsRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.trendingPosts, req.payload))
    const selector = path(['data', 'trendingPosts', 'items'])

    yield put(actions.postsGetTrendingPostsSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsGetTrendingPostsFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

function* postsGetTrendingPostsMoreRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.trendingPosts, req.payload))
    const selector = path(['data', 'trendingPosts', 'items'])

    yield put(actions.postsGetTrendingPostsMoreSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsGetTrendingPostsMoreFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsCommentsGetRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.comments, req.payload))
    const selector = path(['data', 'post', 'comments', 'items'])

    yield put(actions.postsCommentsGetSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsCommentsGetFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* commentsAddRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.addComment, req.payload))
    const selector = path(['data', 'addComment'])

    yield put(actions.commentsAddSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.commentsAddFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* commentsDeleteRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.deleteComment, req.payload))
    const selector = path(['data', 'deleteComment'])

    yield put(actions.commentsDeleteSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.commentsDeleteFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

export default () => [
  takeLatest(constants.POSTS_GET_REQUEST, postsGetRequest),
  takeLatest(constants.POSTS_GET_MORE_REQUEST, postsGetMoreRequest),
  takeLatest(constants.POSTS_VIEWS_GET_REQUEST, postsViewsGetRequest),
  takeLatest(constants.POSTS_LIKES_GET_REQUEST, postsLikesGetRequest),

  takeLatest(constants.POSTS_FEED_GET_REQUEST, postsFeedGetRequest),
  takeLatest(constants.POSTS_FEED_GET_MORE_REQUEST, postsFeedGetMoreRequest),

  takeLatest(constants.POSTS_GET_ARCHIVED_REQUEST, postsGetArchivedRequest),
  takeLatest(constants.POSTS_EDIT_REQUEST, postsEditRequest),
  takeLatest(constants.POSTS_DELETE_REQUEST, postsDeleteRequest),
  
  takeLatest(constants.POSTS_ARCHIVE_REQUEST, postsArchiveRequest),
  takeLatest(constants.POSTS_RESTORE_ARCHIVED_REQUEST, postsRestoreArchivedRequest),

  takeLatest(constants.POSTS_FLAG_REQUEST, postsFlagRequest),
  takeLatest(constants.POSTS_SINGLE_GET_REQUEST, postsSingleGetRequest),

  takeLatest(constants.POSTS_ONYMOUSLY_LIKE_REQUEST, postsOnymouslyLikeRequest),
  takeLatest(constants.POSTS_ANONYMOUSLY_LIKE_REQUEST, postsAnonymouslyLikeRequest),
  takeLatest(constants.POSTS_DISLIKE_REQUEST, postsDislikeRequest),
  takeLatest(constants.POSTS_REPORT_POST_VIEWS_REQUEST, postsReportPostViewsRequest),

  takeLatest(constants.POSTS_GET_TRENDING_POSTS_REQUEST, postsGetTrendingPostsRequest),
  takeLatest(constants.POSTS_GET_TRENDING_POSTS_MORE_REQUEST, postsGetTrendingPostsMoreRequest),
  
  takeLatest(constants.POSTS_COMMENTS_GET_REQUEST, postsCommentsGetRequest),
  takeLatest(constants.COMMENTS_ADD_REQUEST, commentsAddRequest),
  takeLatest(constants.COMMENTS_DELETE_REQUEST, commentsDeleteRequest),
]