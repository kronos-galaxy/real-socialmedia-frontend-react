import { put, takeLatest, call } from 'redux-saga/effects'
import * as actions from 'store/ducks/signup/actions'
import * as constants from 'store/ducks/signup/constants'
import * as errors from 'store/ducks/signup/errors'
import { usernameStatusRequest } from 'services/Validation'

function* gatewayUsernameStatus(payload) {
  const response = yield call(usernameStatusRequest, payload.username)

  if (response.status !== 'AVAILABLE') {
    throw new Error('USER_EXISTS')
  }
 
  return response
}

function* signupUsernameRequest(req) {
  try {
    yield gatewayUsernameStatus(req.payload)
    yield put(actions.signupUsernameSuccess({ payload: req.payload }))
  } catch (error) {
    yield put(actions.signupUsernameFailure({
      message: errors.getMessagePayload(constants.SIGNUP_USERNAME_FAILURE, 'USER_EXISTS', error.message),
      payload: req.payload,
    }))
  }
}

function* signupPhoneRequest(req) {
  yield put(actions.signupPhoneSuccess({ payload: req.payload }))
}

function* signupEmailRequest(req) {
  yield put(actions.signupEmailSuccess({ payload: req.payload }))
}

function* signupPasswordRequest(req) {
  yield put(actions.signupPasswordSuccess({ payload: req.payload }))
}

export default () => [
  takeLatest(constants.SIGNUP_USERNAME_REQUEST, signupUsernameRequest),
  takeLatest(constants.SIGNUP_PHONE_REQUEST, signupPhoneRequest),
  takeLatest(constants.SIGNUP_EMAIL_REQUEST, signupEmailRequest),
  takeLatest(constants.SIGNUP_PASSWORD_REQUEST, signupPasswordRequest),
]