import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/cache/constants'
import uniq from 'ramda/src/uniq'

const initialState = {
  cached: {},
  buffer: {},
  progress: {},
  failed: {},
}

/**
 *
 */
const cacheFetchProgress = (state, action) => update(state, {
  buffer: {
    [action.payload.signature.partial]: {
      $set: {
        progress: action.payload.progress,
        jobId: action.payload.jobId,
        path: action.payload.signature.path,
      },
    },
  },
  progress: {
    [action.payload.signature.pathFolder]: {
      $set: {
        progress: action.payload.progress,
      },
    },
  },
})

update.extend('$unique', (value, original = []) =>
  uniq([...original, value])
  .sort((a, b) => {
    if (a.includes('64p')) {
      return -1
    }
    if (a.includes('480p') && !b.includes('64p')) {
      return -1
    }
    if (a.includes('4k') && !b.includes('64p') && !b.includes('480p')) {
      return -1
    }
    return 0
  })
)

const cacheFetchSuccess = (state, action) => update(state, {
  cached: {
    [action.payload.signature.pathFolder]: {
      $unique: action.payload.signature.path,
    },
  },
  buffer: {
    $unset: [action.payload.signature.partial],
  },
  progress: {
    $unset: [action.payload.signature.pathFolder],
  },
})

const cacheFetchFailure = (state, action) => update(state, {
  buffer: {
    $unset: [action.payload.signature.partial],
  },
  progress: {
    $unset: [action.payload.signature.pathFolder],
  },
  failed: {
    [action.payload.signature.pathFolder]: {
      $unique: action.payload.signature.source,
    },
  },
})

export default handleActions({
  [constants.CACHE_FETCH_SUCCESS]: cacheFetchSuccess,
  [constants.CACHE_FETCH_FAILURE]: cacheFetchFailure,
  [constants.CACHE_FETCH_PROGRESS]: cacheFetchProgress,
}, initialState)
