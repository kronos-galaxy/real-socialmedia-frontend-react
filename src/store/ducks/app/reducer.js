import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/app/constants'

const initialState = {
  appReady: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },

  appTranslation: {
    data: {
      en: {},
      de: {},
    },
    status: 'idle',
    error: {},
    payload: {},
  },

  appTheme: {
    data: [],
    status: 'idle',
  },

  appThemePreview: {
    data: {
      name: null,
      theme: {},
    },
    status: 'idle',
  },
}

/**
 *
 */
const appReadyRequest = (state) => update(state, {
  appReady: {
    status: { $set: 'loading' },
  },
})

const appReadySuccess = (state, action) => update(state, {
  user: {
    $set: action.payload.data,
  },
  appReady: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    error: { $set: initialState.appReady.error },
    payload: {},
    meta: { $set: action.payload.meta },
  },
})

const appReadyFailure = (state, action) => update(state, {
  appReady: {
    data: { $set: initialState.appReady.data },
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
    payload: {},
    meta: { $set: action.payload.meta },
  },
})

const appReadyIdle = (state) => update(state, {
  appReady: { $set: initialState.appReady },
})

/**
 *
 */
const appTranslationRequest = (state, action) => update(state, {
  appTranslation: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const appTranslationSuccess = (state, action) => update(state, {
  appTranslation: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const appTranslationFailure = (state, action) => update(state, {
  appTranslation: {
    error: { $set: action.payload.error },
    status: { $set: 'failure' },
  },
})

const appTranslationIdle = (state) => update(state, {
  appTranslation: {
    data: { $set: initialState.appTranslation.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const appThemeRequest = (state) => update(state, {
  appTheme: {
    status: { $set: 'loading' },
  },
})

const appThemeSuccess = (state, action) => update(state, {
  appTheme: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const appThemeFailure = (state) => update(state, {
  appTheme: {
    status: { $set: 'failure' },
  },
})

const appThemeIdle = (state) => update(state, {
  appTheme: {
    data: { $set: initialState.appTheme.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const appThemePreviewRequest = (state) => update(state, {
  appThemePreview: {
    status: { $set: 'loading' },
  },
})

const appThemePreviewSuccess = (state, action) => update(state, {
  appThemePreview: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const appThemePreviewFailure = (state) => update(state, {
  appThemePreview: {
    status: { $set: 'failure' },
  },
})

const appThemePreviewIdle = (state) => update(state, {
  appThemePreview: {
    data: { $set: initialState.appThemePreview.data },
    status: { $set: 'idle' },
  },
})

export default handleActions({
  [constants.APP_READY_REQUEST]: appReadyRequest,
  [constants.APP_READY_SUCCESS]: appReadySuccess,
  [constants.APP_READY_FAILURE]: appReadyFailure,
  [constants.APP_READY_IDLE]: appReadyIdle,

  [constants.APP_TRANSLATION_REQUEST]: appTranslationRequest,
  [constants.APP_TRANSLATION_SUCCESS]: appTranslationSuccess,
  [constants.APP_TRANSLATION_FAILURE]: appTranslationFailure,
  [constants.APP_TRANSLATION_IDLE]: appTranslationIdle,

  [constants.APP_THEME_REQUEST]: appThemeRequest,
  [constants.APP_THEME_SUCCESS]: appThemeSuccess,
  [constants.APP_THEME_FAILURE]: appThemeFailure,
  [constants.APP_THEME_IDLE]: appThemeIdle,

  [constants.APP_THEME_PREVIEW_REQUEST]: appThemePreviewRequest,
  [constants.APP_THEME_PREVIEW_SUCCESS]: appThemePreviewSuccess,
  [constants.APP_THEME_PREVIEW_FAILURE]: appThemePreviewFailure,
  [constants.APP_THEME_PREVIEW_IDLE]: appThemePreviewIdle,
}, initialState)
