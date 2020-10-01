import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/contacts/constants'

const initialState = {
  contactsGet: {
    status: 'idle',
    error: '',
    items: [],
  },
  invited: {
    items: [],
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
const contactsInviteSuccess = (state, action) =>
  update(state, {
    invited: {
      items: { $push: [action.payload.recordID] },
    },
  })

export default handleActions(
  {
    [constants.CONTACTS_GET_REQUEST]: contactsGetRequest,
    [constants.CONTACTS_GET_SUCCESS]: contactsSuccess,
    [constants.CONTACTS_GET_FAILURE]: contactsFailure,

    [constants.CONTACTS_INVITE_SUCCESS]: contactsInviteSuccess,
  },
  initialState,
)
