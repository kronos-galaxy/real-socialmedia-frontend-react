import { graphqlOperation } from '@aws-amplify/api'
import { call, put, takeLatest, getContext } from 'redux-saga/effects'
import path from 'ramda/src/path'
import * as actions from 'store/ducks/users/actions'
import * as queries from 'store/ducks/users/queries'
import * as constants from 'store/ducks/users/constants'
import * as queryService from 'services/Query'

/**
 *
 */
function* usersSearchRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.searchUsers, req.payload)
    const selector = path(['data', 'searchUsers', 'items'])

    yield put(actions.usersSearchSuccess({ payload: req.payload, data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.usersSearchFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetFollowerUsersRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getFollowerUsers, req.payload)
    const selector = path(['data', 'user', 'followerUsers', 'items'])

    yield put(actions.usersGetFollowerUsersSuccess({ payload: req.payload, data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.usersGetFollowerUsersFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetFollowedUsersRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getFollowedUsers, req.payload)
    const selector = path(['data', 'user', 'followedUsers', 'items'])

    yield put(actions.usersGetFollowedUsersSuccess({ payload: req.payload, data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.usersGetFollowedUsersFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetPendingFollowersRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getFollowerUsers, { ...req.payload, followStatus: 'REQUESTED' })
    const selector = path(['data', 'user', 'followerUsers', 'items'])

    yield put(actions.usersGetPendingFollowersSuccess({ payload: req.payload, data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.usersGetPendingFollowersFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetFollowedUsersWithStoriesRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getFollowedUsersWithStories, req.payload)
    const selector = path(['data', 'self', 'followedUsersWithStories', 'items'])

    yield put(actions.usersGetFollowedUsersWithStoriesSuccess({ payload: req.payload, data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.usersGetFollowedUsersWithStoriesFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersAcceptFollowerUserRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield call(() => queryService.apiRequest(queries.acceptFollowerUser, req.payload))
    const selector = path(['data', 'acceptFollowerUser'])

    yield put(actions.usersAcceptFollowerUserSuccess({ payload: req.payload, data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.usersAcceptFollowerUserFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersDeclineFollowerUserRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield call(() => queryService.apiRequest(queries.denyFollowerUser, req.payload))
    const selector = path(['data', 'denyFollowerUser'])

    yield put(actions.usersDeclineFollowerUserSuccess({ payload: req.payload, data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.usersDeclineFollowerUserFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetProfileRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.user, req.payload)
    const selector = path(['data', 'user'])

    yield put(actions.usersGetProfileSuccess({ payload: req.payload, data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.usersGetProfileFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetProfileSelfRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.self)
    const selector = path(['data', 'self'])

    yield put(actions.usersGetProfileSelfSuccess({ payload: req.payload, data: selector(data), meta: data }))
    yield put(actions.globalAuthUserTrigger({ data: selector(data) }))
  } catch (error) {
    yield put(actions.usersGetProfileSelfFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersEditProfileRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.setUserDetails, req.payload)
    const selector = path(['data', 'setUserDetails'])

    yield put(actions.usersEditProfileSuccess({ payload: req.payload, data: selector(data), meta: data }))
    yield put(actions.globalAuthUserTrigger({ payload: req.payload, data: selector(data) }))
  } catch (error) {
    yield put(actions.usersEditProfileFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersFollowRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield call(() => queryService.apiRequest(queries.followUser, req.payload))
    const selector = path(['data', 'followUser'])

    yield put(actions.usersFollowSuccess({ payload: req.payload, data: selector(data) }))
  } catch (error) {
    yield put(actions.usersFollowFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersUnfollowRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield call(() => queryService.apiRequest(queries.unfollowUser, req.payload))
    const selector = path(['data', 'unfollowUser'])

    yield put(actions.usersUnfollowSuccess({ payload: req.payload, data: selector(data) }))
  } catch (error) {
    yield put(actions.usersUnfollowFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersBlockRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield call(() => queryService.apiRequest(queries.blockUser, req.payload))
    const selector = path(['data', 'blockUser'])

    yield put(actions.usersBlockSuccess({ payload: req.payload, data: selector(data) }))
  } catch (error) {
    yield put(actions.usersBlockFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersUnblockRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield call(() => queryService.apiRequest(queries.unblockUser, req.payload))
    const selector = path(['data', 'unblockUser'])

    yield put(actions.usersUnblockSuccess({ payload: req.payload, data: selector(data) }))
  } catch (error) {
    yield put(actions.usersUnblockFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersImagePostsGetRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getImagePosts, req.payload)
    const selector = path(['data', 'user', 'posts', 'items'])

    yield put(actions.usersImagePostsGetSuccess({ payload: req.payload, data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.usersImagePostsGetFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetTrendingUsersRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.trendingUsers, req.payload)
    const selector = path(['data', 'trendingUsers', 'items'])

    yield put(actions.usersGetTrendingUsersSuccess({ payload: req.payload, data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.usersGetTrendingUsersFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

export default () => [
  takeLatest(constants.USERS_SEARCH_REQUEST, usersSearchRequest),
  takeLatest(constants.USERS_GET_FOLLOWED_USERS_WITH_STORIES_REQUEST, usersGetFollowedUsersWithStoriesRequest),
  takeLatest(constants.USERS_GET_FOLLOWER_USERS_REQUEST, usersGetFollowerUsersRequest),
  takeLatest(constants.USERS_GET_FOLLOWED_USERS_REQUEST, usersGetFollowedUsersRequest),
  takeLatest(constants.USERS_GET_PENDING_FOLLOWERS_REQUEST, usersGetPendingFollowersRequest),
  takeLatest(constants.USERS_ACCEPT_FOLLOWER_USER_REQUEST, usersAcceptFollowerUserRequest),
  takeLatest(constants.USERS_DECLINE_FOLLOWER_USER_REQUEST, usersDeclineFollowerUserRequest),
  takeLatest(constants.USERS_FOLLOW_REQUEST, usersFollowRequest),
  takeLatest(constants.USERS_UNFOLLOW_REQUEST, usersUnfollowRequest),
  takeLatest(constants.USERS_BLOCK_REQUEST, usersBlockRequest),
  takeLatest(constants.USERS_UNBLOCK_REQUEST, usersUnblockRequest),
  takeLatest(constants.USERS_GET_PROFILE_REQUEST, usersGetProfileRequest),
  takeLatest(constants.USERS_GET_PROFILE_SELF_REQUEST, usersGetProfileSelfRequest),
  takeLatest(constants.USERS_EDIT_PROFILE_REQUEST, usersEditProfileRequest),
  takeLatest(constants.USERS_IMAGE_POSTS_GET_REQUEST, usersImagePostsGetRequest),
  takeLatest(constants.USERS_GET_TRENDING_USERS_REQUEST, usersGetTrendingUsersRequest),
]