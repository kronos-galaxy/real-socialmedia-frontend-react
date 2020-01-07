import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/auth/constants'

export const globalAuthUserTrigger = createAction('GLOBAL_AUTH_USER_TRIGGER')

/**
 * 
 */
export const authOnboardIdle = createAction(constants.AUTH_ONBOARD_IDLE)
export const authOnboardRequest = createAction(constants.AUTH_ONBOARD_REQUEST)
export const authOnboardSuccess = createAction(constants.AUTH_ONBOARD_SUCCESS)
export const authOnboardFailure = createAction(constants.AUTH_ONBOARD_FAILURE)

/**
 * 
 */
export const authCheckIdle = createAction(constants.AUTH_CHECK_IDLE)
export const authCheckRequest = createAction(constants.AUTH_CHECK_REQUEST)
export const authCheckSuccess = createAction(constants.AUTH_CHECK_SUCCESS)
export const authCheckFailure = createAction(constants.AUTH_CHECK_FAILURE)

/**
 * 
 */
export const authSigninIdle = createAction(constants.AUTH_SIGNIN_IDLE)
export const authSigninRequest = createAction(constants.AUTH_SIGNIN_REQUEST)
export const authSigninSuccess = createAction(constants.AUTH_SIGNIN_SUCCESS)
export const authSigninFailure = createAction(constants.AUTH_SIGNIN_FAILURE)

/**
 * 
 */
export const authSignupIdle = createAction(constants.AUTH_SIGNUP_IDLE)
export const authSignupRequest = createAction(constants.AUTH_SIGNUP_REQUEST)
export const authSignupSuccess = createAction(constants.AUTH_SIGNUP_SUCCESS)
export const authSignupFailure = createAction(constants.AUTH_SIGNUP_FAILURE)

/**
 * 
 */
export const authSignupResendIdle = createAction(constants.AUTH_SIGNUP_RESEND_IDLE)
export const authSignupResendRequest = createAction(constants.AUTH_SIGNUP_RESEND_REQUEST)
export const authSignupResendSuccess = createAction(constants.AUTH_SIGNUP_RESEND_SUCCESS)
export const authSignupResendFailure = createAction(constants.AUTH_SIGNUP_RESEND_FAILURE)

/**
 * 
 */
export const authSignupConfirmIdle = createAction(constants.AUTH_SIGNUP_CONFIRM_IDLE)
export const authSignupConfirmRequest = createAction(constants.AUTH_SIGNUP_CONFIRM_REQUEST)
export const authSignupConfirmSuccess = createAction(constants.AUTH_SIGNUP_CONFIRM_SUCCESS)
export const authSignupConfirmFailure = createAction(constants.AUTH_SIGNUP_CONFIRM_FAILURE)

/**
 * 
 */
export const authForgotIdle = createAction(constants.AUTH_FORGOT_IDLE)
export const authForgotRequest = createAction(constants.AUTH_FORGOT_REQUEST)
export const authForgotSuccess = createAction(constants.AUTH_FORGOT_SUCCESS)
export const authForgotFailure = createAction(constants.AUTH_FORGOT_FAILURE)

/**
 * 
 */
export const authForgotConfirmIdle = createAction(constants.AUTH_FORGOT_CONFIRM_IDLE)
export const authForgotConfirmRequest = createAction(constants.AUTH_FORGOT_CONFIRM_REQUEST)
export const authForgotConfirmSuccess = createAction(constants.AUTH_FORGOT_CONFIRM_SUCCESS)
export const authForgotConfirmFailure = createAction(constants.AUTH_FORGOT_CONFIRM_FAILURE)

/**
 * 
 */
export const authFacebookIdle = createAction(constants.AUTH_FACEBOOK_IDLE)
export const authFacebookRequest = createAction(constants.AUTH_FACEBOOK_REQUEST)
export const authFacebookSuccess = createAction(constants.AUTH_FACEBOOK_SUCCESS)
export const authFacebookFailure = createAction(constants.AUTH_FACEBOOK_FAILURE)

/**
 * 
 */
export const authGoogleIdle = createAction(constants.AUTH_GOOGLE_IDLE)
export const authGoogleRequest = createAction(constants.AUTH_GOOGLE_REQUEST)
export const authGoogleSuccess = createAction(constants.AUTH_GOOGLE_SUCCESS)
export const authGoogleFailure = createAction(constants.AUTH_GOOGLE_FAILURE)

/**
 * 
 */
export const authSignoutIdle = createAction(constants.AUTH_SIGNOUT_IDLE)
export const authSignoutRequest = createAction(constants.AUTH_SIGNOUT_REQUEST)
export const authSignoutSuccess = createAction(constants.AUTH_SIGNOUT_SUCCESS)
export const authSignoutFailure = createAction(constants.AUTH_SIGNOUT_FAILURE)
