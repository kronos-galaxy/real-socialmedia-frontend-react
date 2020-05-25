import { createSelectorCreator, defaultMemoize } from 'reselect'
import update from 'immutability-helper'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import equals from 'ramda/src/equals'
import assocPath from 'ramda/src/assocPath'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals
)

const postsPool = () => path(['posts', 'postsPool'])
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
  [postsGetCachePost(userId), postsPool()],
  (postsGetCachePost, postsPool) => {
    const mappedPosts = pathOr([], ['data'])(postsGetCachePost).map(post =>
      path([post.postId, 'data'])(postsPool) || post
    )
    return assocPath(['data'], mappedPosts)(postsGetCachePost)
  },
)

/**
 *
 */
const postsSingleGet = () => path(['posts', 'postsSingleGet'])

export const postsSingleGetSelector = (navigationParamPost) => createDeepEqualSelector(
  [postsSingleGet(), postsPoolPost(navigationParamPost.postId), () => navigationParamPost],
  (postsSingleGet, postsPoolPost, navigationParamPost) => postsPoolPost,
)

/**
 *
 */
const postsCommentsGet = () => path(['posts', 'postsCommentsGet'])

export const postsCommentsGetSelector = (postId) => createDeepEqualSelector(
  [postsCommentsGet(postId), postsCommentsGetCachePost(postId)],
  (postsCommentsGet, postsCommentsGetCachePost) => postsCommentsGetCachePost || postsCommentsGet,
)

/**
 *
 */
const postsViewsGet = () => path(['posts', 'postsViewsGet'])

export const postsViewsGetSelector = (postId) => createDeepEqualSelector(
  [postsViewsGet(postId), postsViewsGetCachePost(postId)],
  (postsViewsGet, postsViewsGetCachePost) => postsViewsGetCachePost || postsViewsGet,
)

/**
 *
 */
const postsLikesGet = () => path(['posts', 'postsLikesGet'])

export const postsLikesGetSelector = (postId) => createDeepEqualSelector(
  [postsLikesGet(postId), postsLikesGetCachePost(postId)],
  (postsLikesGet, postsLikesGetCachePost) => postsLikesGetCachePost || postsLikesGet,
)

/**
 *
 */
const postsGetTrendingPosts = () => path(['posts', 'postsGetTrendingPosts'])

export const postsGetTrendingPostsSelector = () => createDeepEqualSelector(
  [postsGetTrendingPosts(), postsPool()],
  (postsGetTrendingPosts, postsPool) => {
    const mappedPosts = pathOr([], ['data'])(postsGetTrendingPosts).map(post =>
      path([post.postId, 'data'])(postsPool) || post
    )
    return assocPath(['data'], mappedPosts)(postsGetTrendingPosts)
  },
)
