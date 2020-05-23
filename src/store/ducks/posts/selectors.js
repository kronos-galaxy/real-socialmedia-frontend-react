import { createSelectorCreator, defaultMemoize } from 'reselect'
import update from 'immutability-helper'
import path from 'ramda/src/path'
import equals from 'ramda/src/equals'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals
)

/**
 *
 */
const postsGet = () => path(['posts', 'postsGet'])
const postsGetCache = (userId) => path(['posts', 'postsGetCache', userId])

export const postsGetSelector = (userId) => createDeepEqualSelector(
  [postsGet(userId), postsGetCache(userId)],
  (postsGet, postsGetCache) => postsGetCache || postsGet,
)

/**
 *
 */
const postsSingleGet = () => path(['posts', 'postsSingleGet'])

export const postsSingleGetSelector = (navigationParamPost) => createDeepEqualSelector(
  [postsSingleGet(), () => navigationParamPost],
  (postsSingleGet, navigationParamPost) => update(postsSingleGet, { data: { $set: navigationParamPost } }),
)

/**
 *
 */
const postsCommentsGet = () => path(['posts', 'postsCommentsGet'])
const postsCommentsGetCache = (postId) => path(['posts', 'postsCommentsGetCache', postId])

export const postsCommentsGetSelector = (postId) => createDeepEqualSelector(
  [postsCommentsGet(postId), postsCommentsGetCache(postId)],
  (postsCommentsGet, postsCommentsGetCache) => postsCommentsGetCache || postsCommentsGet,
)

/**
 *
 */
const postsViewsGet = () => path(['views', 'postsViewsGet'])
const postsViewsGetCache = (postId) => path(['views', 'postsViewsGetCache', postId])

export const postsViewsGetSelector = (postId) => createDeepEqualSelector(
  [postsViewsGet(postId), postsViewsGetCache(postId)],
  (postsViewsGet, postsViewsGetCache) => postsViewsGetCache || postsViewsGet,
)

/**
 *
 */
const postsLikesGet = () => path(['posts', 'postsLikesGet'])
const postsLikesGetCache = (postId) => path(['posts', 'postsLikesGetCache', postId])

export const postsLikesGetSelector = (postId) => createDeepEqualSelector(
  [postsLikesGet(postId), postsLikesGetCache(postId)],
  (postsLikesGet, postsLikesGetCache) => postsLikesGetCache || postsLikesGet,
)