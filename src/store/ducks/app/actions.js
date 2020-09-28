import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/app/constants'

/**
 * Application Runtime initializer, should be moved into /ducks/app perhaps ?!
 */
export const appReadyIdle = createAction(constants.APP_READY_IDLE)
export const appReadyRequest = createAction(constants.APP_READY_REQUEST)
export const appReadySuccess = createAction(constants.APP_READY_SUCCESS)
export const appReadyFailure = createAction(constants.APP_READY_FAILURE)

/**
 *
 */
export const appTranslationIdle = createAction(constants.APP_TRANSLATION_IDLE)
export const appTranslationRequest = createAction(constants.APP_TRANSLATION_REQUEST)
export const appTranslationSuccess = createAction(constants.APP_TRANSLATION_SUCCESS)
export const appTranslationFailure = createAction(constants.APP_TRANSLATION_FAILURE)

/**
 * 
 */
export const appThemeIdle = createAction(constants.APP_THEME_IDLE)
export const appThemeRequest = createAction(constants.APP_THEME_REQUEST)
export const appThemeSuccess = createAction(constants.APP_THEME_SUCCESS)
export const appThemeFailure = createAction(constants.APP_THEME_FAILURE)

/**
 * 
 */
export const appThemePreviewIdle = createAction(constants.APP_THEME_PREVIEW_IDLE)
export const appThemePreviewRequest = createAction(constants.APP_THEME_PREVIEW_REQUEST)
export const appThemePreviewSuccess = createAction(constants.APP_THEME_PREVIEW_SUCCESS)
export const appThemePreviewFailure = createAction(constants.APP_THEME_PREVIEW_FAILURE)
