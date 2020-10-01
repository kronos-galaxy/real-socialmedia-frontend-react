import { Linking, Alert } from 'react-native'
import { put, call, select, spawn } from 'redux-saga/effects'
import * as usersActions from 'store/ducks/users/actions'
import { authUserSelector } from 'store/ducks/auth/selectors'
import * as actions from 'store/ducks/contacts/actions'
import * as selectors from 'store/ducks/contacts/selectors'
import * as queries from 'store/ducks/contacts/queries'
import * as queryService from 'services/Query'

function* grantUserSubscriptionBonus() {
  try {
    const invited = yield select(selectors.invited)

    if (invited.items.length === 10) {
      yield call(queryService.apiRequest, queries.grantUserSubscriptionBonus)
      yield put(usersActions.usersGetProfileSelfRequest())
      yield call([Alert, 'alert'], 'Congratulations', 'Your earned free REAL Diamond')
    }
  } catch (error) {
    // ignore
  }
}

function* contactsInviteRequest(req) {
  try {
    const authUser = yield select(authUserSelector)
    const subject = 'Invite to REAL.app'
    const body = `https://apps.apple.com/us/app/real-social-media/id1485194570?referralId=${authUser.username}&ls=1`
    const { contact } = req.payload

    if (contact.type === 'email') {
      yield call([Linking, 'openURL'], `mailto:${contact.value}?subject=${subject}&body=${body}`)
    } else if (contact.type === 'phone') {
      yield call([Linking, 'openURL'], `sms:${contact.value}&body=${body}`)
    } else {
      throw new Error('Invite supports only email and phone type')
    }

    yield put(actions.contactsInviteSuccess(req.payload.user))
    yield spawn(grantUserSubscriptionBonus)
  } catch (error) {
    yield put(actions.contactsInviteFailure(error.message))
  }
}

export default contactsInviteRequest
