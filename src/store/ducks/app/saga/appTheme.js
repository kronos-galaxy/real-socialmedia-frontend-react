import { put, takeLatest } from 'redux-saga/effects'
import * as actions from 'store/ducks/app/actions'
import * as constants from 'store/ducks/app/constants'

/**
 *
 */
function* handleAppThemeRequest() {
  const data = yield fetch('https://d3dclx0mrf3ube.cloudfront.net/themes.json')
  return yield data.json()
}

/**
 * 
 */
function* appThemeRequest() {
  try {
    const data = yield handleAppThemeRequest()
    yield put(actions.appThemeSuccess({ data }))
  } catch (error) {
    yield put(actions.appThemeFailure({ message: error.message }))
  }
}

/**
 * 
 */
function* appThemePreviewRequest(req) {
  try {
    yield put(actions.appThemePreviewSuccess({ data: req.payload }))
  } catch (error) {
    yield put(actions.appThemePreviewFailure({ message: error.message }))
  }
}

export default () => [
  takeLatest(constants.APP_THEME_REQUEST, appThemeRequest),
  takeLatest(constants.APP_THEME_PREVIEW_REQUEST, appThemePreviewRequest),
]