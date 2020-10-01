import { Linking, Alert } from 'react-native'
import { expectSaga } from 'redux-saga-test-plan'
import contactsInviteRequest from 'store/ducks/contacts/saga/contactsInvite'
import * as authSelectors from 'store/ducks/auth/selectors'
import * as usersActions from 'store/ducks/users/actions'
import * as actions from 'store/ducks/contacts/actions'
import * as queries from 'store/ducks/contacts/queries'
import * as queryService from 'services/Query'

jest.spyOn(Alert, 'alert')
jest.spyOn(Linking, 'openURL')
Linking.openURL.mockResolvedValue(true)

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))
jest.mock('store/ducks/auth/selectors', () => ({ authUserSelector: jest.fn() }))

authSelectors.authUserSelector.mockReturnValue({ username: 'username' })

const user = { recordID: 1 }
const emailContact = { value: 'test@email.com', type: 'email' }
const phoneContact = { value: '+12342343', type: 'phone' }
const subject = 'Invite to REAL.app'
const body = 'https://apps.apple.com/us/app/real-social-media/id1485194570?referralId=username&ls=1'
const emptyInvitedState = { contacts: { invited: { items: [] } } }

describe('Contacts Invite saga', () => {
  it('email type', () => {
    return expectSaga(contactsInviteRequest, actions.contactsInviteRequest({ user, contact: emailContact }))
      .withState(emptyInvitedState)

      .call([Linking, 'openURL'], `mailto:${emailContact.value}?subject=${subject}&body=${body}`)
      .not.call(queryService.apiRequest, queries.grantUserSubscriptionBonus)
      .put(actions.contactsInviteSuccess(user))

      .silentRun()
  })

  it('phone type', () => {
    return expectSaga(contactsInviteRequest, actions.contactsInviteRequest({ user, contact: phoneContact }))
      .withState(emptyInvitedState)

      .call([Linking, 'openURL'], `sms:${phoneContact.value}&body=${body}`)
      .not.call(queryService.apiRequest, queries.grantUserSubscriptionBonus)
      .put(actions.contactsInviteSuccess(user))

      .silentRun()
  })

  it('not supported type', () => {
    return expectSaga(
      contactsInviteRequest,
      actions.contactsInviteRequest({ user, contact: { type: undefined, value: '' } }),
    )
      .withState(emptyInvitedState)

      .not.call([Linking, 'openURL'], `mailto:${emailContact.value}?subject=${subject}&body=${body}`)
      .not.call([Linking, 'openURL'], `sms:${phoneContact.value}&body=${body}`)
      .not.call(queryService.apiRequest, queries.grantUserSubscriptionBonus)
      .put(actions.contactsInviteFailure('Invite supports only email and phone type'))

      .silentRun()
  })

  it('grand bonus', () => {
    return expectSaga(contactsInviteRequest, actions.contactsInviteRequest({ user, contact: phoneContact }))
      .withState({ contacts: { invited: { items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] } } })

      .call(queryService.apiRequest, queries.grantUserSubscriptionBonus)
      .put(usersActions.usersGetProfileSelfRequest())
      .call([Alert, 'alert'], 'Congratulations', 'Your earned free REAL Diamond')
      .put(actions.contactsInviteSuccess(user))

      .silentRun()
  })

  it('ignore bonus query error', () => {
    queryService.apiRequest.mockRejectedValueOnce(false)

    return expectSaga(contactsInviteRequest, actions.contactsInviteRequest({ user, contact: phoneContact }))
      .withState({ contacts: { invited: { items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] } } })

      .call(queryService.apiRequest, queries.grantUserSubscriptionBonus)
      .not.put(usersActions.usersGetProfileSelfRequest())
      .not.call([Alert, 'alert'], 'Congratulations', 'Your earned free REAL Diamond')
      .put(actions.contactsInviteSuccess(user))

      .silentRun()
  })
})
