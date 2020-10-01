import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openSettings } from 'react-native-permissions'
import * as actions from 'store/ducks/contacts/actions'
import * as selectors from 'store/ducks/contacts/selectors'
import useAppState from 'services/AppState'

const InviteFriendsService = ({ children }) => {
  const dispatch = useDispatch()
  const contactsGet = useSelector(selectors.contactsGet)
  const invited = useSelector(selectors.invited)
  const contactsGetRequest = () => dispatch(actions.contactsGetRequest())
  const contactsInviteRequest = (contact) => dispatch(actions.contactsInviteRequest(contact))

  const checkPermissionUpdates = () => {
    if (contactsGet.status === 'failure') {
      contactsGetRequest()
    }
  }

  useEffect(checkPermissionUpdates, [])
  useAppState({ onForeground: checkPermissionUpdates })

  return children({
    contactsGetRequest,
    contactsGet,
    openSettings,
    contactsInviteRequest,
    invited,
  })
}

export default InviteFriendsService
