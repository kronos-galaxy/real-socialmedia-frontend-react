import { createSelectorCreator, defaultMemoize } from 'reselect'
import update from 'immutability-helper'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import equals from 'ramda/src/equals'
import assocPath from 'ramda/src/assocPath'
import * as normalizer from 'normalizer/schemas'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals
)

const sortyByPostView = (prev, next) => {
  if (prev.viewedStatus === 'NOT_VIEWED' && next.viewedStatus === 'VIEWED') {
    return -1
  } else {
    return 0
  }
}

const entities = () => path(['entities'])
const postsPool = () => path(['posts', 'postsPool'])
const commentsPool = () => path(['posts', 'commentsPool'])
const postsPoolPost = (postId) => path(['posts', 'postsPool', postId])
const postsGetCache = () => path(['posts', 'postsGetCache'])
const postsGetCachePost = (userId) => path(['posts', 'postsGetCache', userId])
const postsCommentsGetCachePost = (postId) => path(['posts', 'postsCommentsGetCache', postId])
const postsViewsGetCachePost = (postId) => path(['posts', 'postsViewsGetCache', postId])
const postsLikesGetCache = () => path(['posts', 'postsLikesGetCache'])
const postsLikesGetCachePost = (postId) => path(['posts', 'postsLikesGetCache', postId])

/**
 *
 */
const postsGet = () => path(['posts', 'postsGet'])

export const postsGetSelector = (userId) => createDeepEqualSelector(
  [postsGet(), entities()],
  (postsGet, entities) => {
    const denormalized = normalizer.denormalizePostsGet(postsGet.data, entities)
    return assocPath(['data'], denormalized)(postsGet)
  }
)

/**
 *
 */
const postsGetUnreadComments = () => path(['posts', 'postsGetUnreadComments'])

export const postsGetUnreadCommentsSelector = (userId) => createDeepEqualSelector(
  [postsGetUnreadComments(), entities()],
  (postsGetUnreadComments, entities) => {
    const denormalized = normalizer.denormalizePostsGet(postsGetUnreadComments.data, entities)
    return assocPath(['data'], denormalized)(postsGetUnreadComments)
  }
)

/**
 *
 */
const postsGetArchived = () => path(['posts', 'postsGetArchived'])

export const postsGetArchivedSelector = () => createDeepEqualSelector(
  [postsGetArchived(), entities()],
  (postsGetArchived, entities) => {
    const denormalized = normalizer.denormalizePostsGet(postsGetArchived.data, entities)
    return assocPath(['data'], denormalized)(postsGetArchived)
  }
)

/**
 *
 */
const postsFeedGet = () => path(['posts', 'postsFeedGet'])

export const postsFeedGetSelector = () => createDeepEqualSelector(
  [postsFeedGet(), entities()],
  (postsFeedGet, entities) => {
    const denormalized = normalizer.denormalizePostsGet(postsFeedGet.data, entities)
    return assocPath(['data'], denormalized)(postsFeedGet)
  }
)

/**
 *
 */
const postsSingleGet = () => path(['posts', 'postsSingleGet'])

export const postsSingleGetSelector = (navigationParamPost) => createDeepEqualSelector(
  [postsSingleGet(), entities()],
  (postsSingleGet, entities) => {
    const denormalized = normalizer.denormalizePostGet(postsSingleGet.data, entities)
    return assocPath(['data'], denormalized)(postsSingleGet)
  }
)

/**
 *
 */
const postsCommentsGet = () => path(['posts', 'postsCommentsGet'])

export const postsCommentsGetSelector = (postId) => createDeepEqualSelector(
  [postsCommentsGet(), entities()],
  (postsCommentsGet, entities) => {
    const denormalized = normalizer.denormalizeCommentsGet(postsCommentsGet.data, entities)
    return assocPath(['data'], denormalized)(postsCommentsGet)
  }
)

/**
 *
 */
const postsViewsGet = () => path(['posts', 'postsViewsGet'])

export const postsViewsGetSelector = (postId) => createDeepEqualSelector(
  [postsViewsGet(), entities()],
  (postsViewsGet, entities) => {
    const denormalized = normalizer.denormalizeUsersGet(postsViewsGet.data, entities)
    return assocPath(['data'], denormalized)(postsViewsGet)
  }
)

/**
 *
 */
const postsLikesGet = () => path(['posts', 'postsLikesGet'])

export const postsLikesGetSelector = (postId) => createDeepEqualSelector(
  [postsLikesGet(), entities()],
  (postsLikesGet, entities) => {
    const denormalized = normalizer.denormalizeUsersGet(postsLikesGet.data, entities)
    return assocPath(['data'], denormalized)(postsLikesGet)
  }
)

/**
 *
 */
const postsGetTrendingPosts = () => path(['posts', 'postsGetTrendingPosts'])

export const postsGetTrendingPostsSelector = () => createDeepEqualSelector(
  [postsGetTrendingPosts(), entities()],
  (postsGetTrendingPosts, entities) => {
    const denormalized = normalizer.denormalizePostsGet(postsGetTrendingPosts.data, entities)
    return assocPath(['data'], denormalized)(postsGetTrendingPosts)
  }
)
