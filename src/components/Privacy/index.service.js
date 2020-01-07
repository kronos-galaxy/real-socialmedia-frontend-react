import { useEffect } from 'react'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { withNavigation } from 'react-navigation'

const PrivacyService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUserSelector)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)

  const togglePrivacyStatus = () =>
    dispatch(usersActions.usersEditProfileRequest({
      privacyStatus: user.privacyStatus === 'PRIVATE' ? 'PUBLIC' : 'PRIVATE',
    }))

  const toggleFollowCountsHidden = () =>
    dispatch(usersActions.usersEditProfileRequest({
      followCountsHidden: !user.followCountsHidden,
    }))

  const toggleLikesDisabled = () =>
    dispatch(usersActions.usersEditProfileRequest({
      likesDisabled: !user.likesDisabled,
    }))

  const toggleCommentsDisabled = () =>
    dispatch(usersActions.usersEditProfileRequest({
      commentsDisabled: !user.commentsDisabled,
    }))

  useEffect(() => {
    if (usersEditProfile.status === 'success') {
      dispatch(usersActions.usersEditProfileIdle())
    }
  }, [usersEditProfile.status])

  return children({
    user,
    togglePrivacyStatus,
    toggleFollowCountsHidden,
    toggleLikesDisabled,
    toggleCommentsDisabled,
  })
}

export default withNavigation(PrivacyService)
