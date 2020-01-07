import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as usersServices from 'store/ducks/users/services'
import * as postsActions from 'store/ducks/posts/actions'
import { withNavigation } from 'react-navigation'

const ProfileService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.auth.user)
  const usersGetProfile = useSelector(state => state.users.usersGetProfile)
  const usersGetProfileCache = useSelector(state => state.users.usersGetProfileCache)
  const usersBlock = useSelector(state => state.users.usersBlock)
  const usersUnblock = useSelector(state => state.users.usersUnblock)
  const postsStoriesGet = useSelector(state => state.posts.postsStoriesGet)
  const usersFollow = useSelector(state => state.users.usersFollow)
  const usersUnfollow = useSelector(state => state.users.usersUnfollow)
  const userId = navigation.getParam('userId')

  const usersGetProfileRequest = ({ userId }) => 
    dispatch(usersActions.usersGetProfileRequest({ userId }))

  const postsStoriesGetRequest = ({ userId }) =>
    dispatch(postsActions.postsStoriesGetRequest({ userId }))

  const usersUnblockRequest = ({ userId }) =>
    dispatch(usersActions.usersUnblockRequest({ userId }))

  const usersBlockRequest = ({ userId }) =>
    dispatch(usersActions.usersBlockRequest({ userId }))

  const usersFollowRequest = ({ userId }) =>
    dispatch(usersActions.usersFollowRequest({ userId }))
  
  const usersUnfollowRequest = ({ userId }) =>
    dispatch(usersActions.usersUnfollowRequest({ userId }))

  useEffect(() => {
    if (usersBlock.status === 'success') {
      dispatch(usersActions.usersBlockIdle())
    }

    if (usersUnblock.status === 'success') {
      dispatch(usersActions.usersUnblockIdle())
    }
  }, [
    usersBlock.status,
    usersUnblock.status,
  ])

  useEffect(() => {
    usersGetProfileRequest({ userId })
    postsStoriesGetRequest({ userId })
  }, [userId])

  return children({
    authUser,
    usersGetProfile: usersServices.cachedUsersGetProfile(usersGetProfile, usersGetProfileCache, navigation),
    usersGetProfileRequest,
    postsStoriesGet,
    postsStoriesGetRequest,
    usersUnblock,
    usersUnblockRequest,
    usersBlock,
    usersBlockRequest,
    usersFollow,
    usersFollowRequest,
    usersUnfollow,
    usersUnfollowRequest,
  })
}

export default withNavigation(ProfileService)
