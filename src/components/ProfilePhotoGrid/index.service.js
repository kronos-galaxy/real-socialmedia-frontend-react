import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import { useNavigation } from '@react-navigation/native'
import * as navigationActions from 'navigation/actions'
import * as usersSelector from 'store/ducks/users/selectors'
import HeaderRight from 'navigation/HeaderRight'
import { VERIFICATION_TYPE } from 'components/Verification'

const ProfilePhotoGridService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUserSelector)
  const usersImagePostsGet = useSelector(usersSelector.usersImagePostsGetSelector())
  const usersChangeAvatar = useSelector(usersSelector.usersChangeAvatar)

  useEffect(() => {
    dispatch(usersActions.usersImagePostsGetRequest({ userId: user.userId, isVerified: true }))
  }, [])

  useEffect(() => {
    if (usersChangeAvatar.status === 'success') {
      navigation.goBack()
      dispatch(usersActions.usersChangeAvatarIdle())
    }
  }, [usersChangeAvatar.status])

  const [selectedPost, setSelectedPost] = useState({})
  const handlePostPress = (post) => setSelectedPost(post)

  const changeAvatarRequest = () => 
    dispatch(usersActions.usersChangeAvatarRequest(selectedPost))

  /**
   *
   */
  const headerRight = () => (
    <HeaderRight onPress={changeAvatarRequest} title="Update" hidden={!selectedPost.postId} />
  )

  /**
   *
   */
  useEffect(() => {
    navigation.setOptions({
      headerRight,
    })
  }, [selectedPost.postId])

  const handleOpenVerification = navigationActions.navigateVerification(navigation, {
    actionType: VERIFICATION_TYPE.BACK,
  })

  return children({
    usersImagePostsGet,
    handlePostPress,
    selectedPost,
    handleOpenVerification,
  })
}

export default ProfilePhotoGridService
