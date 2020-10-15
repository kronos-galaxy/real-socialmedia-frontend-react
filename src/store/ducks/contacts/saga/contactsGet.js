import prop from 'ramda/src/prop'
import indexBy from 'ramda/src/indexBy'
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions'
import { call, getContext, put } from 'redux-saga/effects'
import Contacts from 'react-native-contacts'
import { parsePhoneNumberFromString } from 'libphonenumber-js/min'
import * as actions from 'store/ducks/contacts/actions'
import * as queries from 'store/ducks/contacts/queries'
import * as queryService from 'services/Query'

function normalizeContacts(contacts) {
  const makeFullName = (user) => {
    const fullName = [user.givenName, user.middleName, user.familyName].filter((i) => i).join(' ')

    return fullName ? fullName : 'Anonymous'
  }

  return contacts.map((item) => ({
    contactId: item.recordID,
    fullName: makeFullName(item),
    emails: item.emailAddresses.map(prop('email')),
    phones: item.phoneNumbers.map(prop('number')),
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

function normalizeContactsForGQLRequest(contacts) {
  return contacts.map((item) => ({
    contactId: item.contactId,
    emails: item.emails,
    phones: item.phones.reduce((acc, item) => {
      try {
        const phone = parsePhoneNumberFromString(item, 'US')

        if (!phone.isValid()) {
          throw new Error('Not valid phone number')
        }

        return [...acc, phone.format('E.164')]
      } catch (error) {
        return acc
      }
    }, []),
  }))
}

function* findContacts() {
  const contacts = yield call(getAllContacts)
  const normalizedContacts = yield call(normalizeContacts, contacts)

  try {
    const variables = { contacts: normalizeContactsForGQLRequest(normalizedContacts) }
    const response = yield call([queryService, 'apiRequest'], queries.findContacts, variables)
    const users = indexBy(prop('contactId'), response.data.findContacts)
    const mixedContacts = normalizedContacts.map((item) => {
      return { ...item, user: users[item.contactId] ? users[item.contactId].user : undefined }
    })

    return mixedContacts.sort((a, b) => {
      if (a.user && b.user) {
        return a.fullName < b.fullName ? -1 : 1
      }

      if (!b.user) {
        return -1
      } else {
        return 1
      }
    })
  } catch (error) {
    return normalizedContacts
  }
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

    const contacts = yield call(findContacts)
    yield put(actions.contactsGetSuccess({ data: contacts }))
  } catch (error) {
    yield put(actions.contactsGetFailure({ message: errorWrapper(error) }))
  }
}

export default contactsGetRequest
