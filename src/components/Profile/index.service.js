import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import { useNavigation, useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'
import * as usersSelector from 'store/ducks/users/selectors'

const ProfileService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()

  const user = path(['params', 'user'])(route)
  const userId = user.userId

  const usersGetProfile = useSelector(usersSelector.usersGetProfileSelector(userId))
  const usersBlock = useSelector(state => state.users.usersBlock)
  const usersUnblock = useSelector(state => state.users.usersUnblock)
  const usersFollow = useSelector(state => state.users.usersFollow)
  const usersUnfollow = useSelector(state => state.users.usersUnfollow)

  const profileRef = useRef(null)

  navigation.setOptions({
    title: path(['data', 'username'])(usersGetProfile),
  })

  const usersGetProfileRequest = ({ userId }) => 
    dispatch(usersActions.usersGetProfileRequest({ userId }))

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
      dispatch(usersActions.usersBlockIdle({}))
    }

    if (usersUnblock.status === 'success') {
      dispatch(usersActions.usersUnblockIdle({}))
    }
  }, [
    usersBlock.status,
    usersUnblock.status,
  ])

  useEffect(() => {
    usersGetProfileRequest({ userId })
  }, [userId])

  return children({
    profileRef,
    user,
    usersGetProfile,
    usersGetProfileRequest,
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

export default ProfileService
