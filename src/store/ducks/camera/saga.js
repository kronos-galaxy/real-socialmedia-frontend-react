import { put, takeLatest } from 'redux-saga/effects'
import * as actions from 'store/ducks/camera/actions'
import * as constants from 'store/ducks/camera/constants'

function* handleCameraCaptureRequest(payload) {
  return {
    uri: payload.uri,
    takenInReal: payload.takenInReal,
    originalFormat: payload.originalFormat,
  }
}

function* cameraCaptureRequest(req) {
  try {
    const data = yield handleCameraCaptureRequest(req.payload)
    yield put(actions.cameraCaptureSuccess({ data }))
  } catch (error) {
    yield put(actions.cameraCaptureFailure({ message: error.message }))
  }
}

export default () => [
  takeLatest(constants.CAMERA_CAPTURE_REQUEST, cameraCaptureRequest),
]