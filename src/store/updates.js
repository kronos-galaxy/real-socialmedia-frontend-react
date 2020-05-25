import update, { extend } from 'immutability-helper'
import path from 'ramda/src/path'
import map from 'ramda/src/map'
import set from 'ramda/src/set'
import lensProp from 'ramda/src/lensProp'

update.extend('$map', (value, nextObject) =>
  nextObject.map((element) => update(element, value))
)

const getFilteredState = map(set(lensProp('status'), 'idle'))

/**
 *
 */
extend('$resourceCacheSetRequest', ({ payload, resourceKey, initialState }, original) => {
  const filtered = getFilteredState(original)
  const nextState = (path([resourceKey])(filtered)) ?
    filtered :
    update(filtered, { [resourceKey]: { $set: initialState } })

  return update(nextState, {
    [resourceKey]: {
      status: { $set: 'loading' },
      payload: { $set: payload },
    },
  })
})

/**
 *
 */
extend('$resourceCacheSetSuccess', ({ payload, resourceKey, initialState }, original) => {
  const filtered = getFilteredState(original)
  const nextState = (path([resourceKey])(filtered)) ?
    filtered :
    update(filtered, { [resourceKey]: { $set: initialState } })

  return update(nextState, {
    [resourceKey]: {
      data: { $set: payload.data },
      status: { $set: 'success' },
      error: { $set: {} },
      payload: { $set: payload.payload || {} },
      meta: { $set: payload.meta || {} },
    },
  })
})

/**
 *
 */
extend('$resourceCacheSetFailure', ({ payload, resourceKey, initialState }, original) => {
  const filtered = getFilteredState(original)
  const nextState = (path([resourceKey])(filtered)) ?
    filtered :
    update(filtered, { [resourceKey]: { $set: initialState } })

  return update(nextState, {
    [resourceKey]: {
      status: { $set: 'failure' },
      payload: { $set: payload.payload || {} },
    },
  })
})

/**
 *
 */
extend('$resourceCacheSetIdle', ({ payload, resourceKey, initialState }, original) => {
  const filtered = getFilteredState(original)
  const nextState = (path([resourceKey])(filtered)) ?
    filtered :
    update(filtered, { [resourceKey]: { $set: initialState } })

  return update(nextState, {
    [resourceKey]: {
      status: { $set: 'idle' },
      payload: { $set: payload.payload || {} },
    },
  })
})

/**
 *
 */

extend('$resourceCacheSetRemove', ({ payload, resourceKey }, original) =>
  update(original, {
    $unset: [resourceKey],
  })
)

/**
 *
 */
extend('$resourceCacheAlterRequest', ({ payload, resourceKey, initialState }, original) => {
  const filtered = getFilteredState(original)
  const nextState = (path([resourceKey])(filtered)) ?
    filtered :
    update(filtered, { [resourceKey]: { $set: initialState } })

  return update(nextState, {
    [resourceKey]: {
      data: { $set: payload.payload.data },
      status: { $set: 'loading' },
      error: { $set: {} },
      payload: { $set: payload.payload || {} },
      meta: { $set: payload.meta || {} },
    },
  })
})

/**
 *
 */
extend('$resourceCachePushRequest', ({ payload, resourceKey, initialState }, original) => {
  const filtered = getFilteredState(original)
  const nextState = (path([resourceKey])(filtered)) ?
    filtered :
    update(filtered, { [resourceKey]: { $set: initialState } })

  return update(nextState, {
    [resourceKey]: {
      status: { $set: 'loading' },
      payload: { $set: payload },
    },
  })
})

extend('$resourceCachePushSuccess', ({ payload, resourceKey, initialState }, original) => {
  const filtered = getFilteredState(original)
  const nextState = (path([resourceKey])(filtered)) ?
    filtered :
    update(filtered, { [resourceKey]: { $set: initialState } })

  return update(nextState, {
    [resourceKey]: {
      status: { $set: 'success' },
      data: { $push: payload.data },
      payload: { $set: payload.payload || {} },
      meta: { $set: payload.meta || {} },
    },
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
    $merge: payload.data.reduce((acc, post) => {
      acc[post.postId] = update(initialState, {
        data: { $set: post },
        status: { $set: 'success' },
      })
      return acc
    }, {})
  })
})

