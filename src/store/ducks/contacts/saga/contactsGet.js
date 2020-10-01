import prop from 'ramda/src/prop'
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions'
import { call, getContext, put } from 'redux-saga/effects'
import Contacts from 'react-native-contacts'
import * as actions from 'store/ducks/contacts/actions'

function normalizeContacts(contacts) {
  const makeFullName = (user) => {
    const fullName = [user.givenName, user.middleName, user.familyName].filter((i) => i).join(' ')

    return fullName ? fullName : 'Anonymous'
  }

  return contacts.map((item) => ({
    recordID: item.recordID,
    fullName: makeFullName(item),
    emailAddresses: item.emailAddresses.map(prop('email')),
    phoneNumbers: item.phoneNumbers.map(prop('number')),
    thumbnailPath: item.thumbnailPath,
  }))
}

function getAllContacts() {
  return new Promise((resolve, reject) =>
    Contacts.getAll((error, contacts) => {
      if (error) {
        reject(error)
      } else {
        resolve(contacts)
      }
    }),
  )
}

function* requestContactsPermission() {
  const status = yield call(check, PERMISSIONS.IOS.CONTACTS)

  if (status === RESULTS.DENIED) {
    return yield call(request, PERMISSIONS.IOS.CONTACTS)
  } else {
    return status
  }
}

function* contactsGetRequest() {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const permission = yield call(requestContactsPermission)

    if ([RESULTS.BLOCKED, RESULTS.UNAVAILABLE, RESULTS.DENIED].includes(permission)) {
      throw new Error(`Contacts permission is ${permission}`)
    }

    const contacts = yield call(getAllContacts)
    yield put(actions.contactsGetSuccess({ items: normalizeContacts(contacts) }))
  } catch (error) {
    yield put(actions.contactsGetFailure(errorWrapper(error)))
  }
}

export default contactsGetRequest
