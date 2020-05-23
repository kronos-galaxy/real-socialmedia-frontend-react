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
