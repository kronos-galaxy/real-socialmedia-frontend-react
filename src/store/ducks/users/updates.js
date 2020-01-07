import update, { extend } from 'immutability-helper'
import path from 'ramda/src/path'

update.extend('$map', (value, nextObject) =>
  nextObject.map((element) => update(element, value))
)

/**
 *
 */
extend('$usersGetFollowedUsersCacheRequest', ({ payload }, original) =>
  update(original, {
    [payload.userId]: {
      $set: {
        data: [],
        status: 'loading',
        error: {},
        payload,
        meta: {},
      },
    },
  })
)

/**
 *
 */
extend('$usersGetFollowedUsersCacheSuccess', ({ payload }, original) =>
  update(original, {
    [payload.payload.userId]: {
      $set: {
        data: payload.data,
        status: 'success',
        error: {},
        payload: payload.payload || {},
      },
    },
  })
)

/**
 *
 */
extend('$usersGetFollowedUsersCacheFailure', ({ payload }, original) =>
  update(original, {
    [payload.payload.userId]: {
      $set: {
        data: [],
        status: 'failure',
        error: {},
        payload: payload.payload || {},
      },
    },
  })
)

/**
 *
 */
extend('$usersGetFollowedUsersCacheIdle', ({ payload }, original) =>
  update(original, {
    [payload.payload.userId]: {
      $set: {
        data: [],
        status: 'idle',
        error: {},
        payload: payload.payload || {},
      },
    },
  })
)

/**
 *
 */
extend('$usersGetFollowerUsersCacheRequest', ({ payload }, original) =>
  update(original, {
    [payload.userId]: {
      $set: {
        data: [],
        status: 'loading',
        error: {},
        payload,
        meta: {},
      },
    },
  })
)

/**
 *
 */
extend('$usersGetFollowerUsersCacheSuccess', ({ payload }, original) =>
  update(original, {
    [payload.payload.userId]: {
      $set: {
        data: payload.data,
        status: 'success',
        error: {},
        payload: payload.payload || {},
      },
    },
  })
)

/**
 *
 */
extend('$usersGetFollowerUsersCacheFailure', ({ payload }, original) =>
  update(original, {
    [payload.payload.userId]: {
      $set: {
        data: [],
        status: 'failure',
        error: {},
        payload: payload.payload || {},
      },
    },
  })
)

/**
 *
 */
extend('$usersGetFollowerUsersCacheIdle', ({ payload }, original) =>
  update(original, {
    [payload.payload.userId]: {
      $set: {
        data: [],
        status: 'idle',
        error: {},
        payload: payload.payload || {},
      },
    },
  })
)

/**
 *
 */
extend('$usersGetProfileCacheRequest', ({ payload, initialState }, original) => {
  const nextState = (path([payload.userId])(original)) ?
    original :
    update(original, { [payload.userId]: { $set: initialState } })

  return update(nextState, {
    [payload.userId]: {
      status: { $set: 'loading' },
      payload: { $set: payload },
    },
  })
})

/**
 *
 */
extend('$usersGetProfileCacheSuccess', ({ payload }, original) =>
  update(original, {
    [payload.payload.userId]: {
      data: { $set: payload.data },
      status: { $set: 'success' },
      error: { $set: {} },
      payload: { $set: payload.payload || {} },
      meta: { $set: payload.meta || {} },
    },
  })
)

/**
 *
 */
extend('$usersGetProfileCacheFailure', ({ payload }, original) =>
  update(original, {
    [payload.payload.userId]: {
      status: { $set: 'failure' },
      payload: { $set: payload.payload || {} },
    },
  })
)

/**
 *
 */
extend('$usersGetProfileCacheIdle', ({ payload }, original) =>
  update(original, {
    [payload.payload.userId]: {
      status: { $set: 'idle' },
      payload: { $set: payload.payload || {} },
    },
  })
)