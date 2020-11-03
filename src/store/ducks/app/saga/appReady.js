import { select, put, call, take, race, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/app/actions'
import * as constants from 'store/ducks/app/constants'
import * as errors from 'store/ducks/app/errors'
import * as authSelectors from 'store/ducks/auth/selectors'
import * as authActions from 'store/ducks/auth/actions'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Updates from 'services/Updates'
import translationsJson from 'assets/translations.json'

/**
 * Translation library setup, appTranslation.data is an object of:
 * {
 *   en: { translation: { [key]: value, [key]: value } },
 *   de: { translation: { [key]: value, [key]: value } },
 * }
 */
function* translationInit() {
  const languageCode = yield select(authSelectors.languageCodeSelector)

  const config = {
    resources: translationsJson,
    lng: languageCode || 'en',
    fallbackLng: 'en',
  }
  i18n.use(initReactI18next).init(config)
}

function* handleAppReady() {
  yield call(translationInit)
}

/**
 * Fetching assets such as language and translation
 */
function* appReadyRequest(req) {
  try {
    const data = yield call(handleAppReady, req.payload)
    yield put(actions.appReadySuccess({
      message: errors.getMessagePayload(constants.APP_READY_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    yield put(actions.appReadyFailure({
      message: errors.getMessagePayload(constants.APP_READY_FAILURE, 'GENERIC', error.message),
    }))
  }
}

function* appReadySuccess() {
  /**
   * Is application at latest version
   */
  yield call([Updates, 'versionCheck'])

  /**
   * Start auth flow
   */
  yield put(authActions.authFlowRequest({ allowAnonymous: false }))
}

export default () => [
  takeEvery(constants.APP_READY_REQUEST, appReadyRequest),
  takeEvery(constants.APP_READY_SUCCESS, appReadySuccess),
]