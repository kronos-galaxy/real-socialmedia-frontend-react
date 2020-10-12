import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/contacts/constants'

const initialState = {
  contactsGet: {
    status: 'idle',
    error: '',
    items: [],
  },
  contactsInvite: {
    invited: {},
    requested: {},
    error: '',
  },
}

/**
 *
 */
const contactsGetRequest = (state) =>
  update(state, {
    contactsGet: {
      status: { $set: 'loading' },
      error: { $set: initialState.contactsGet.error },
    },
  })

const contactsSuccess = (state, action) =>
  update(state, {
    contactsGet: {
      status: { $set: 'success' },
      items: { $set: action.payload.items },
    },
  })

const contactsFailure = (state, action) =>
  update(state, {
    contactsGet: {
      status: { $set: 'failure' },
      error: { $set: action.payload },
      items: { $set: initialState.contactsGet.items },
    },
  })

/**
 *
 */
const contactsInviteRequest = (state, action) =>
  update(state, {
    contactsInvite: {
      requested: { $merge: { [action.payload.contactId]: true } },
    },
  })

const contactsInviteSuccess = (state, action) =>
  update(state, {
    contactsInvite: {
      invited: { $merge: { [action.payload.contactId]: true } },
      requested: { $unset: [action.payload.contactId] },
    },
  })

const contactsInviteFailure = (state, action) =>
  update(state, {
    contactsInvite: {
      requested: { $unset: [action.payload.contactId] },
    },
  })

export default handleActions(
  {
    [constants.CONTACTS_GET_REQUEST]: contactsGetRequest,
    [constants.CONTACTS_GET_SUCCESS]: contactsSuccess,
    [constants.CONTACTS_GET_FAILURE]: contactsFailure,

    [constants.CONTACTS_INVITE_REQUEST]: contactsInviteRequest,
    [constants.CONTACTS_INVITE_SUCCESS]: contactsInviteSuccess,
    [constants.CONTACTS_INVITE_FAILURE]: contactsInviteFailure,

    [constants.CONTACTS_FOLLOW_REQUEST]: contactsInviteRequest,
    [constants.CONTACTS_FOLLOW_SUCCESS]: contactsInviteSuccess,
    [constants.CONTACTS_FOLLOW_FAILURE]: contactsInviteFailure,
  },
  initialState,
)
