import update from 'immutability-helper'
import pathOr from 'ramda/src/pathOr'
import path from 'ramda/src/path'

/**
 * 
 * 
 * @param {*} postsSingleGet 
 * @param {*} navigation 
 */
export const cachedPostsSingleGet = (postsSingleGet, cachedPost) => {
  const response = update(postsSingleGet, {
    data: { $set: cachedPost },
  })

  if (
    path(['data', 'postId'])(postsSingleGet) === path(['postId'])(cachedPost) &&
    path(['status'])(postsSingleGet) === 'success'
  ) {
    return postsSingleGet
  }

  return response
}

/**
 * 
 * 
 * @param {*} postsSingleGet 
 * @param {*} navigation 
 */
export const cachedPostsGet = (postsGet, postsGetCache, userId) => {
  const cache = path([userId])(postsGetCache)
  if (cache) {
    return cache
  }

  return postsGet
}

/**
 * 
 * 
 * @param {*} postsSingleGet 
 * @param {*} navigation 
 */
export const cachedPostsMediaFeedGet = (postsFeedGetCache, userId, postId) => {
  const cache = path([userId])(postsFeedGetCache)

  const cutHead = (response) => {
    const headIndex = pathOr([], ['data'], response).findIndex(item => item.postId === postId)

    if (headIndex === -1) {
      return response
    }

    return update(response, {
      data: { $set: response.data.slice(headIndex) },
    })
  }

  return cutHead(cache)
}

/**
 * 
 * 
 * @param {*} postsSingleGet 
 * @param {*} navigation 
 */
export const cachedPostsGetTrendingPosts = (postsFeedGetCache, postId) => {
  const cutHead = (response) => {
    const headIndex = pathOr([], ['data'], response).findIndex(item => item.postId === postId)

    if (headIndex === -1) {
      return response
    }

    return update(response, {
      data: { $set: response.data.slice(headIndex) },
    })
  }

  return cutHead(postsFeedGetCache)
}