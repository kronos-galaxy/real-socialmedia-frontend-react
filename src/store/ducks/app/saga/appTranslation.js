import { put, takeLatest } from 'redux-saga/effects'
import * as actions from 'store/ducks/app/actions'
import * as constants from 'store/ducks/app/constants'

/**
 *
 */
function* handleTranslationFetchRequest() {
  const data = yield fetch('https://dtoqrayxo467g.cloudfront.net/translations/resources.json')
  return yield data.json()
}

/**
 * 
 */
function* appTranslationRequest() {
  try {
    const data = yield handleTranslationFetchRequest()
    yield put(actions.appTranslationSuccess({ data }))
  } catch (error) {
    yield put(actions.appTranslationFailure({ message: error.message }))
  }
}

export default () => [
  takeLatest(constants.APP_TRANSLATION_REQUEST, appTranslationRequest),
]