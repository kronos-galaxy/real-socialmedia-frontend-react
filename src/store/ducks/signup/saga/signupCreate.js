import { put, call, take, race, takeEvery, getContext } from 'redux-saga/effects'
import * as actions from 'store/ducks/signup/actions'
import * as constants from 'store/ducks/signup/constants'
import * as queries from 'store/ducks/signup/queries'
import * as errors from 'store/ducks/signup/errors'
import * as authActions from 'store/ducks/auth/actions'
import * as authConstants from 'store/ducks/auth/constants'
import * as queryService from 'services/Query'
import * as navigationActions from 'navigation/actions'
import { logEvent } from 'services/Analytics'

/**
 *
 */
function* queryBasedOnSignupType(payload) {
  if (payload.usernameType === 'email') {
    yield queryService.apiRequest(queries.startChangeUserEmail, { email: payload.email })
  } else if (payload.usernameType === 'phone') {
    const phoneNumber = `${payload.countryCode}${payload.phone}`
    yield queryService.apiRequest(queries.startChangeUserPhoneNumber, { phoneNumber })
  } else {
    throw new Error('Unsupported usernameType')
  }
}

function* handleSignupCreateRequest(payload) {
  /**
   * Fetching cognito credentials/tokens
   */
  yield put(authActions.authTokenRequest({ allowAnonymous: true }))
  const { tokenFailure } = yield race({
    tokenSuccess: take(authConstants.AUTH_TOKEN_SUCCESS),
    tokenFailure: take(authConstants.AUTH_TOKEN_FAILURE),
  })

  if (tokenFailure) {
    throw new Error('Failed to obtain token')
  }

  /**
   * Fetching user data from api
   */
  yield put(authActions.authDataRequest({ allowAnonymous: true }))
  const { dataFailure } = yield race({
    dataSuccess: take(authConstants.AUTH_DATA_SUCCESS),
    dataFailure: take(authConstants.AUTH_DATA_FAILURE),
  })

  if (dataFailure) {
    throw new Error('Failed to fetch data')
  }

  yield call(queryBasedOnSignupType, payload)
}

/**
 *
 */
function* signupCreateRequest(req) {
  try {
    logEvent('SIGNUP_CREATE_REQUEST')
    
    yield handleSignupCreateRequest(req.payload)
    yield put(actions.signupCreateSuccess({
      message: errors.getMessagePayload(constants.SIGNUP_CREATE_SUCCESS, 'GENERIC' ), 
      usernameType: req.payload.usernameType,
    }))
  } catch (error) {
    if (error.message === 'USER_CONFIRMATION_DELIVERY') {
      yield put(actions.signupCreateFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'USER_CONFIRMATION_DELIVERY', error.message),
      }))
    } else if (error.code === 'UsernameExistsException') {
      yield put(actions.signupCreateFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'USER_EXISTS', error.message),
      }))
    } else if (error.code === 'InvalidPasswordException') {
      yield put(actions.signupCreateFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'INVALID_PASSWORD', error.message),
      }))
    } else if (error.code === 'InvalidParameterException') {
      yield put(actions.signupCreateFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'INVALID_PARAMETER', error.message),
      }))
    } else {
      yield put(actions.signupCreateFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

function* signupCreateSuccess(req) {
  logEvent('SIGNUP_CREATE_SUCCESS')
  const ReactNavigationRef = yield getContext('ReactNavigationRef')

  if (req.payload.usernameType === 'phone') {
    logEvent('SIGNUP_PHONE_SUCCESS')
    navigationActions.navigateAuthPhoneConfirm(ReactNavigationRef.current)
  }

  if (req.payload.usernameType === 'email') {
    logEvent('SIGNUP_EMAIL_SUCCESS')
    navigationActions.navigateAuthEmailConfirm(ReactNavigationRef.current)
  }
}

export default () => [
  takeEvery(constants.SIGNUP_CREATE_REQUEST, signupCreateRequest),
  takeEvery(constants.SIGNUP_CREATE_SUCCESS, signupCreateSuccess),
]