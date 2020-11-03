import { put, getContext, call } from 'redux-saga/effects'
import path from 'ramda/src/path'
import * as actions from 'store/ducks/users/actions'
import * as queries from 'store/ducks/users/queries'
import * as queryService from 'services/Query'
import * as entitiesActions from 'store/ducks/entities/actions'
import * as normalizer from 'normalizer/schemas'

/**
 *
 */
function* usersImagePostsGetRequestData(response) {
  const dataSelector = path(['data', 'user', 'posts', 'items'])
  const data = dataSelector(response)
  const normalized = normalizer.normalizePostsGet(data)

  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return normalized.result
}

function* usersImagePostsGetRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const response = yield call([queryService, 'apiRequest'], queries.getImagePosts, req.payload)
    const data = yield usersImagePostsGetRequestData(response)
    yield put(actions.usersImagePostsGetSuccess({ data }))
  } catch (error) {
    yield put(actions.usersImagePostsGetFailure({ message: errorWrapper(error) }))
  }
}

export default usersImagePostsGetRequest
