import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as usersServices from 'store/ducks/users/services'
import { withNavigation } from 'react-navigation'

const ProfileFollowedService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const userId = navigation.getParam('userId')
  const usersGetFollowedUsers = useSelector(state => state.users.usersGetFollowedUsers)
  const usersGetFollowedUsersCache = useSelector(state => state.users.usersGetFollowedUsersCache)
  const usersFollow = useSelector(state => state.users.usersFollow)
  const usersUnfollow = useSelector(state => state.users.usersUnfollow)
  const usersAcceptFollowerUser = useSelector(state => state.users.usersAcceptFollowerUser)

  const usersGetFollowedUsersRequest = (payload) => 
    dispatch(usersActions.usersGetFollowedUsersRequest(payload))

  const usersFollowRequest = ({ userId }) =>
    dispatch(usersActions.usersFollowRequest({ userId }))
  
  const usersUnfollowRequest = ({ userId }) =>
    dispatch(usersActions.usersUnfollowRequest({ userId }))
  
  const usersAcceptFollowerUserRequest = ({ userId }) =>
    dispatch(usersActions.usersAcceptFollowerUserRequest({ userId }))

  useEffect(() => {
    if (usersFollow.status === 'success') {
      usersGetFollowedUsersRequest({ userId })
    }
    if (usersUnfollow.status === 'success') {
      usersGetFollowedUsersRequest({ userId })
    }
  }, [usersFollow.status, usersUnfollow.status])

  useEffect(() => {
    usersGetFollowedUsersRequest({ userId })
  }, [userId])

  return children({
    usersGetFollowedUsers: usersServices.cachedUsersGetFollowedUsers(usersGetFollowedUsers, usersGetFollowedUsersCache, userId),
    usersFollow,
    usersFollowRequest,
    usersUnfollow,
    usersUnfollowRequest,
    usersAcceptFollowerUser,
    usersAcceptFollowerUserRequest,
  })
}

export default withNavigation(ProfileFollowedService)
