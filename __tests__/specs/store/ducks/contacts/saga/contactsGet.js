import { getContext } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import Contacts from 'react-native-contacts'
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions'
import contacts from 'store/ducks/contacts/saga'
import * as actions from 'store/ducks/contacts/actions'
import { testAsRootSaga } from 'tests/utils/helpers'
import { errorWrapper } from 'store/helpers'

jest.mock('react-native-contacts', () => ({ getAll: jest.fn((cb) => cb(new Error('Get All Error'), undefined)) }))

jest.mock('react-native-permissions', () => ({
  check: jest.fn(),
  request: jest.fn(),
  PERMISSIONS: { IOS: { CONTACTS: 'CONTACTS' } },
  RESULTS: {
    DENIED: 'DENIED',
    BLOCKED: 'BLOCKED',
    UNAVAILABLE: 'UNAVAILABLE',
    GRANTED: 'GRANTED',
  },
}))

const emailAddresses = [{ email: 'test1@email.com' }, { email: 'test2@email.com' }]
const phoneNumbers = [{ number: '+19999999' }, { number: '+2999999' }]
const items = [
  {
    recordID: 1,
    givenName: 'givenName1',
    middleName: 'middleName1',
    familyName: 'familyName1',
    thumbnailPath: 'thumbnailPath',
    emailAddresses,
    phoneNumbers,
  },
  {
    recordID: 2,
    givenName: '',
    middleName: 'middleName1',
    familyName: 'familyName1',
    thumbnailPath: 'thumbnailPath',
    emailAddresses,
    phoneNumbers,
  },
  {
    recordID: 3,
    givenName: 'givenName1',
    middleName: '',
    familyName: 'familyName1',
    thumbnailPath: 'thumbnailPath',
    emailAddresses,
    phoneNumbers,
  },
  {
    recordID: 4,
    givenName: '',
    middleName: '',
    familyName: '',
    thumbnailPath: 'thumbnailPath',
    emailAddresses,
    phoneNumbers,
  },
]

describe('Contacts saga', () => {
  it('Permission UNAVAILABLE', () => {
    const context = [
      [matchers.call.fn(check), RESULTS.UNAVAILABLE],
      [getContext('errorWrapper'), errorWrapper],
    ]

    return expectSaga(testAsRootSaga(contacts))
      .provide(context)

      .call(check, PERMISSIONS.IOS.CONTACTS)
      .not.call(request, PERMISSIONS.IOS.CONTACTS)
      .put(actions.contactsGetFailure('Contacts permission is UNAVAILABLE'))

      .dispatch(actions.contactsGetRequest())
      .silentRun()
  })

  it('Permission BLOCKED', () => {
    const context = [
      [matchers.call.fn(check), RESULTS.BLOCKED],
      [getContext('errorWrapper'), errorWrapper],
    ]

    return expectSaga(testAsRootSaga(contacts))
      .provide(context)

      .call(check, PERMISSIONS.IOS.CONTACTS)
      .not.call(request, PERMISSIONS.IOS.CONTACTS)
      .put(actions.contactsGetFailure('Contacts permission is BLOCKED'))

      .dispatch(actions.contactsGetRequest())
      .silentRun()
  })

  it('Permission DENIED', () => {
    const context = [
      [matchers.call.fn(check), RESULTS.DENIED],
      [matchers.call.fn(request), RESULTS.DENIED],
      [getContext('errorWrapper'), errorWrapper],
    ]

    return expectSaga(testAsRootSaga(contacts))
      .provide(context)

      .call(check, PERMISSIONS.IOS.CONTACTS)
      .call(request, PERMISSIONS.IOS.CONTACTS)
      .put(actions.contactsGetFailure('Contacts permission is DENIED'))

      .dispatch(actions.contactsGetRequest())
      .silentRun()
  })

  it('failed get contacts', () => {
    const context = [
      [matchers.call.fn(check), RESULTS.GRANTED],
      [getContext('errorWrapper'), errorWrapper],
    ]

    return expectSaga(testAsRootSaga(contacts))
      .provide(context)

      .call(check, PERMISSIONS.IOS.CONTACTS)
      .put(actions.contactsGetFailure('Get All Error'))

      .dispatch(actions.contactsGetRequest())
      .silentRun()
  })

  it('success', () => {
    Contacts.getAll.mockImplementationOnce((cb) => cb(null, items))

    const context = [
      [matchers.call.fn(check), RESULTS.GRANTED],
      [getContext('errorWrapper'), errorWrapper],
    ]

    return expectSaga(testAsRootSaga(contacts))
      .provide(context)

      .call(check, PERMISSIONS.IOS.CONTACTS)
      .put(
        actions.contactsGetSuccess({
          items: [
            {
              recordID: 1,
              fullName: 'givenName1 middleName1 familyName1',
              emailAddresses: ['test1@email.com', 'test2@email.com'],
              phoneNumbers: ['+19999999', '+2999999'],
              thumbnailPath: 'thumbnailPath',
            },
            {
              recordID: 2,
              fullName: 'middleName1 familyName1',
              emailAddresses: ['test1@email.com', 'test2@email.com'],
              phoneNumbers: ['+19999999', '+2999999'],
              thumbnailPath: 'thumbnailPath',
            },
            {
              recordID: 3,
              fullName: 'givenName1 familyName1',
              emailAddresses: ['test1@email.com', 'test2@email.com'],
              phoneNumbers: ['+19999999', '+2999999'],
              thumbnailPath: 'thumbnailPath',
            },
            {
              recordID: 4,
              fullName: 'Anonymous',
              emailAddresses: ['test1@email.com', 'test2@email.com'],
              phoneNumbers: ['+19999999', '+2999999'],
              thumbnailPath: 'thumbnailPath',
            },
          ],
        }),
      )

      .dispatch(actions.contactsGetRequest())
      .silentRun()
  })
})
