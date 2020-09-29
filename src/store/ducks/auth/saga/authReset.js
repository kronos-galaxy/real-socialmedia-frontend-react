import { call, put, getContext, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import * as errors from 'store/ducks/auth/errors'
import Config from 'react-native-config'

/**
 *
 */
function* resetCognitoCredentials() {
  const AwsCache = yield getContext('AwsCache')
  const AwsCredentials = yield getContext('AwsCredentials')

  yield call([AwsCache, 'removeItem'], `CognitoIdentityId-${Config.AWS_COGNITO_IDENTITY_POOL_ID}`)
  yield call([AwsCredentials, 'clear'])
}

/**
 *
 */
function* resetCognitoFederated() {
  const AwsCache = yield getContext('AwsCache')

  yield call([AwsCache, 'removeItem'], 'aws-amplify-federatedInfo')
}

function* handleAuthResetRequest(payload = { credentials: true, federated: true }) {
  if (payload.credentials) {
    yield call(resetCognitoCredentials)
  }

  if (payload.federated) {
    yield call(resetCognitoFederated)
  }
}

/**
 * Reset cognito tokens
 */
function* authResetRequest(req) {
  try {
    yield handleAuthResetRequest(req.payload)
    yield put(actions.authResetSuccess({
      message: errors.getMessagePayload(constants.AUTH_RESET_SUCCESS, 'GENERIC'),
    }))
  } catch (error) {
    yield put(actions.authResetFailure({
      message: errors.getMessagePayload(constants.AUTH_RESET_FAILURE, 'GENERIC', error.message),
    }))
  }
}

export default () => [
  takeEvery(constants.AUTH_RESET_REQUEST, authResetRequest),
]