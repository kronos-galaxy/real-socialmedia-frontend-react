import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/signup/constants'

export const initialState = {
  signupUsername: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  signupPassword: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  signupCreate: {
    status: 'idle',
    error: {},
    payload: {},
  },
  signupConfirm: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
}

/**
 *
 */
const signupUsernameRequest = (state, action) => update(state, {
  signupUsername: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const signupUsernameSuccess = (state, action) => update(state, {
  signupUsername: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },
})

const signupUsernameFailure = (state, action) => update(state, {
  signupUsername: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
    error: { $set: action.payload.message },
  },
})

const signupUsernameIdle = (state) => update(state, {
  signupUsername: {
    status: { $set: 'idle' },
    payload: { $set: initialState.signupUsername.payload },
    error: { $set: initialState.signupUsername.error },
  },
})

/**
 *
 */
const signupPasswordRequest = (state, action) => update(state, {
  signupPassword: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const signupPasswordSuccess = (state, action) => update(state, {
  signupPassword: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },
})

const signupPasswordFailure = (state, action) => update(state, {
  signupPassword: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
    error: { $set: action.payload.message },
  },
})

const signupPasswordIdle = (state) => update(state, {
  signupPassword: {
    status: { $set: 'idle' },
    payload: { $set: initialState.signupPassword.payload },
    error: { $set: initialState.signupPassword.error },
  },
})

/**
 *
 */
const signupCreateRequest = (state, action) => update(state, {
  signupCreate: {
    status: { $set: 'loading' },
    payload: { $merge: action.payload },
  },
})

const signupCreateSuccess = (state) => update(state, {
  signupCreate: {
    status: { $set: 'success' },
  },
})

const signupCreateFailure = (state, action) => update(state, {
  signupCreate: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const signupCreateIdle = (state) => update(state, {
  signupCreate: { $set: initialState.signupCreate },
})

/**
 *
 */
const signupConfirmRequest = (state, action) => update(state, {
  signupConfirm: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const signupConfirmSuccess = (state, action) => update(state, {
  signupConfirm: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },
})

const signupConfirmFailure = (state, action) => update(state, {
  signupConfirm: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
    error: { $set: action.payload.message },
  },
})

const signupConfirmIdle = (state) => update(state, {
  signupConfirm: {
    status: { $set: 'idle' },
    payload: { $set: initialState.signupConfirm.payload },
    error: { $set: initialState.signupConfirm.error },
  },
})

export default handleActions({
  [constants.SIGNUP_USERNAME_REQUEST]: signupUsernameRequest,
  [constants.SIGNUP_USERNAME_SUCCESS]: signupUsernameSuccess,
  [constants.SIGNUP_USERNAME_FAILURE]: signupUsernameFailure,
  [constants.SIGNUP_USERNAME_IDLE]: signupUsernameIdle,

  [constants.SIGNUP_PASSWORD_REQUEST]: signupPasswordRequest,
  [constants.SIGNUP_PASSWORD_SUCCESS]: signupPasswordSuccess,
  [constants.SIGNUP_PASSWORD_FAILURE]: signupPasswordFailure,
  [constants.SIGNUP_PASSWORD_IDLE]: signupPasswordIdle,

  [constants.SIGNUP_CREATE_REQUEST]: signupCreateRequest,
  [constants.SIGNUP_CREATE_SUCCESS]: signupCreateSuccess,
  [constants.SIGNUP_CREATE_FAILURE]: signupCreateFailure,
  [constants.SIGNUP_CREATE_IDLE]: signupCreateIdle,

  [constants.SIGNUP_CONFIRM_REQUEST]: signupConfirmRequest,
  [constants.SIGNUP_CONFIRM_SUCCESS]: signupConfirmSuccess,
  [constants.SIGNUP_CONFIRM_FAILURE]: signupConfirmFailure,
  [constants.SIGNUP_CONFIRM_IDLE]: signupConfirmIdle,
}, initialState)
