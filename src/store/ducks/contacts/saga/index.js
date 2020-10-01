import { takeLeading } from 'redux-saga/effects'
import * as constants from 'store/ducks/contacts/constants'
import contactsGetRequest from 'store/ducks/contacts/saga/contactsGet'
import contactsInviteRequest from 'store/ducks/contacts/saga/contactsInvite'

export default () => [
  takeLeading(constants.CONTACTS_GET_REQUEST, contactsGetRequest),
  takeLeading(constants.CONTACTS_INVITE_REQUEST, contactsInviteRequest),
]
