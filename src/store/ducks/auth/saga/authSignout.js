import { put, call, getContext, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import * as errors from 'store/ducks/auth/errors'
import { federatedGoogleSignout } from 'services/AWS'
import { resetAuthUserPersist } from 'services/Auth'
import Config from 'react-native-config'
import * as navigationActions from 'navigation/actions'

/**
 * Remove cognito credentials
 */
function* handleAuthSignoutRequest() {
  const AwsAuth = yield getContext('AwsAuth')
  const AwsCache = yield getContext('AwsCache')
  const AwsCredentials = yield getContext('AwsCredentials')

  yield call([AwsCredentials, 'clear'])
  yield call([AwsCache, 'removeItem'], `CognitoIdentityId-${Config.AWS_COGNITO_IDENTITY_POOL_ID}`)
  yield call([AwsAuth, 'signOut'], { global: true })
  yield call(resetAuthUserPersist)
  yield call(federatedGoogleSignout)

  yield put(actions.authFlowIdle())

  return {
    meta: {
    },
    data: {
    },
  }
}

function* authSignoutRequest(req) {
  try {
    const { data, meta } = yield handleAuthSignoutRequest(req.payload)
    yield put(actions.authSignoutSuccess({
      message: errors.getMessagePayload(constants.AUTH_FLOW_SUCCESS, 'GENERIC'),
      data,
      meta,
    }))
  } catch (error) {
    yield put(actions.authSignoutFailure({
      message: errors.getMessagePayload(constants.AUTH_FLOW_FAILURE, 'GENERIC', error.message),
      meta: {
        authenticated: false,
      },
    }))
  }
}

function* authSignoutSuccess() {
  const ReactNavigationRef = yield getContext('ReactNavigationRef')
  navigationActions.navigateAuthHome(ReactNavigationRef.current)()
}

export default () => [
  takeEvery(constants.AUTH_SIGNOUT_REQUEST, authSignoutRequest),
  takeEvery(constants.AUTH_SIGNOUT_SUCCESS, authSignoutSuccess),
]