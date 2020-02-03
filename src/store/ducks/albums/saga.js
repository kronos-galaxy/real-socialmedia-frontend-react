import { put, takeLatest } from 'redux-saga/effects'
import * as actions from 'store/ducks/albums/actions'
import * as constants from 'store/ducks/albums/constants'

/**
 * 
 */
function* albumsCreateRequest() {
  try {
    const data = yield () => {}
    yield put(actions.albumsCreateSuccess({ data }))
  } catch (error) {
    yield put(actions.albumsCreateFailure({ message: error.message }))
  }
}

/**
 * 
 */
function* albumsEditRequest() {
  try {
    const data = yield () => {}
    yield put(actions.albumsEditSuccess({ data }))
  } catch (error) {
    yield put(actions.albumsEditFailure({ message: error.message }))
  }
}

/**
 * 
 */
function* albumsDeleteRequest() {
  try {
    const data = yield () => {}
    yield put(actions.albumsDeleteSuccess({ data }))
  } catch (error) {
    yield put(actions.albumsDeleteFailure({ message: error.message }))
  }
}

export default () => [
  takeLatest(constants.ALBUMS_CREATE_REQUEST, albumsCreateRequest),
  takeLatest(constants.ALBUMS_EDIT_REQUEST, albumsEditRequest),
  takeLatest(constants.ALBUMS_DELETE_REQUEST, albumsDeleteRequest),
]