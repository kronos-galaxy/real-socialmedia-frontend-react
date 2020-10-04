import { call, put, getContext, takeEvery } from 'redux-saga/effects'
import {
  federatedGoogleSignin,
} from 'services/AWS'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import * as errors from 'store/ducks/auth/errors'
import * as queries from 'store/ducks/auth/queries'
import * as queryService from 'services/Query'

/**
 *
 */
function* handleAuthUpgradeGoogleRequest() {
  const AwsAuth = yield getContext('AwsAuth')

  const google = yield federatedGoogleSignin()

  const userPayload = {
    id: google.user.id,
    name: google.user.name,
    email: google.user.email,
    authProvider: 'GOOGLE',
    token: google.token,
  }

  yield call([AwsAuth, 'currentUserCredentials'])
  yield call([queryService, 'apiRequest'], queries.linkGoogleLogin, { googleIdToken: userPayload.token })
  yield call([queryService, 'apiRequest'], queries.setFullname, { fullName: userPayload.name })
  yield call([AwsAuth, 'currentUserCredentials'])

  return google
}

/**
 *
 */
function* authUpgradeGoogleRequest(req) {
  try {
    const data = yield handleAuthUpgradeGoogleRequest(req.payload)
    yield put(actions.authUpgradeGoogleSuccess({
      message: errors.getMessagePayload(constants.AUTH_UPGRADE_GOOGLE_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    if (error.message && error.message.includes('The user canceled the sign in request')) {
      yield put(actions.authUpgradeGoogleFailure({
        message: errors.getMessagePayload(constants.AUTH_UPGRADE_GOOGLE_FAILURE, 'CANCELED', error.message),
      }))
    } else {
      yield put(actions.authUpgradeGoogleFailure({
        message: errors.getMessagePayload(constants.AUTH_UPGRADE_GOOGLE_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

export default () => [
  takeEvery(constants.AUTH_UPGRADE_GOOGLE_REQUEST, authUpgradeGoogleRequest),
]