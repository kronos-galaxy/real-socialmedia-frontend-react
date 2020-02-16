import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as usersServices from 'store/ducks/users/services'
import { withNavigation } from 'react-navigation'

const ProfileService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.auth.user)
  const usersGetProfileSelf = useSelector(state => state.users.usersGetProfileSelf)
  const userId = authUser.userId

  const usersGetProfileSelfRequest = ({ userId }) => 
    dispatch(usersActions.usersGetProfileSelfRequest({ userId }))

  useEffect(() => {
    usersGetProfileSelfRequest({ userId })
  }, [userId])

  return children({
    authUser,
    usersGetProfile: usersServices.cachedUsersGetProfileSelf(usersGetProfileSelf, authUser),
    usersGetProfileSelfRequest,
  })
}

export default withNavigation(ProfileService)
