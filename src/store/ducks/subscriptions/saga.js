import { graphqlOperation } from '@aws-amplify/api'
import { call, put, takeEvery, takeLatest, getContext } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import path from 'ramda/src/path'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as postsQueries from 'store/ducks/posts/queries'
import * as usersQueries from 'store/ducks/users/queries'
import * as queryService from 'services/Query'

function postSubscriptionChannel({ subscription }) {
  return eventChannel(emitter => {
    subscription.subscribe({
      next: emitter,
      error: () => {},
    })

    return () => subscription.unsubscribe()
  })
}

function* postSubscription(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const userId = path(['payload', 'data'])(req)

  const subscription = AwsAPI.graphql(
    graphqlOperation(postsQueries.onPostNotification, { userId })
  )
  yield put(postsActions.postsFeedGetRequest({ limit: 20 }))
  yield put(postsActions.postsGetTrendingPostsRequest({ limit: 20 }))
  yield put(usersActions.usersGetPendingFollowersRequest({ userId }))
  yield put(usersActions.usersGetFollowedUsersWithStoriesRequest({}))

  const channel = yield call(postSubscriptionChannel, {
    subscription,
  })

  yield takeEvery(channel, function *(eventData) {
    const postId = path(['value', 'data', 'onPostNotification', 'post', 'postId'])(eventData)
    const userId = path(['value', 'data', 'onPostNotification', 'userId'])(eventData)
    const type = path(['value', 'data', 'onPostNotification', 'type'])(eventData)
    
    const data = yield queryService.apiRequest(postsQueries.getPost, { postId })
    const selector = path(['data', 'post'])

    if (type === 'COMPLETED') {
      yield put(postsActions.postsCreateSuccess({ data: {}, payload: selector(data), meta: {} }))
      yield put(postsActions.postsFeedGetRequest({  }))
      yield put(postsActions.postsGetRequest({ userId }))
      yield put(usersActions.usersImagePostsGetRequest({ userId }))
    }
  })
}

function cardSubscriptionChannel({ subscription }) {
  return eventChannel(emitter => {
    subscription.subscribe({
      next: emitter,
      error: () => {},
    })

    return () => subscription.unsubscribe()
  })
}

function* cardSubscription(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const userId = path(['payload', 'data'])(req)

  const subscription = AwsAPI.graphql(
    graphqlOperation(usersQueries.onCardNotification, { userId })
  )

  const channel = yield call(cardSubscriptionChannel, {
    subscription,
  })

  yield takeEvery(channel, function *(eventData) {
    yield put(usersActions.usersGetCardsRequest({}))
    yield put(postsActions.postsGetUnreadCommentsRequest({ limit: 20 }))
  })
}

export default () => [
  takeLatest('AUTH_CHECK_READY', postSubscription),
  takeLatest('AUTH_CHECK_READY', cardSubscription),
]