import update, { extend } from 'immutability-helper'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import map from 'ramda/src/map'
import set from 'ramda/src/set'
import lensProp from 'ramda/src/lensProp'

const getFilteredState = map(set(lensProp('status'), 'idle'))

/**
 *
 */
extend('$postsResourceCacheSetSuccess', ({ payload, resourceKey, initialState }, original) => {
  const filtered = getFilteredState(original)
  const nextState = (path([resourceKey])(filtered)) ?
    filtered :
    update(filtered, { [resourceKey]: { $set: initialState } })

  return update(nextState, {
    [resourceKey]: {
      data: { $set: pathOr([], ['data'])(payload).map(post => post.postId) },
      status: { $set: 'success' },
      error: { $set: {} },
      payload: { $set: payload.payload || {} },
      meta: { $set: payload.meta || {} },
    },
  })
})

/**
 * Resource pool post hash, will replace post object with postId key
 * [{postId, image ...}, {postId, image ...}] -> [postId, postId]
 */
extend('$resourcePoolHash', ({ payload }, original) => {
  return update(original, {
    $set: pathOr([], ['data'])(payload).map(post => post.postId)
  })
})

/**
 * Resource pool merge
 */
extend('$resourcePoolSet', ({ payload }, original) => {
  return update(original, {
    [payload.data.postId]: {
      data: { $set: payload.data },
      status: { $set: 'success' },
    },
  })
})

/**
 * Resource pool merge
 */
extend('$resourcePoolMerge', ({ payload, initialState }, original) => {
  return update(original, {
    $merge: pathOr([], ['data'])(payload).reduce((acc, post) => {
      acc[post.postId] = update(initialState, {
        data: { $set: post },
        status: { $set: 'success' },
      })
      return acc
    }, {})
  })
})

