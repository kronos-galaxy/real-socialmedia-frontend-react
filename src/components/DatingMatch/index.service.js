import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as navigationActions from 'navigation/actions'
import { useNavigation } from '@react-navigation/native'
import pathOr from 'ramda/src/pathOr'

const DatingMatchService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUserSelector)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)
  
  const usersEditProfileRequest = (payload) =>
    dispatch(usersActions.usersEditProfileRequest(payload))
  
  useEffect(() => {
    if (usersEditProfile.status === 'success') {
      dispatch(usersActions.usersEditProfileIdle({}))
      navigationActions.navigateDatingProfile(navigation)()
    }
  }, [usersEditProfile.status])

  /**
   * Form helpers
   */
  const handleFormTransform = (values) => ({
    matchAgeRange: {
      min: values.matchAgeRangeMin,
      max: values.matchAgeRangeMax,
    },
    matchGenders: values.matchGenders,
    matchLocationRadius: values.matchLocationRadius,
    location: values.location,
  })

  const handleFormSubmit = (values) => {
    usersEditProfileRequest(handleFormTransform(values))
  }

  const formSubmitLoading = usersEditProfile.status === 'loading'
  const formSubmitDisabled = usersEditProfile.status === 'loading'
  const formErrorMessage = usersEditProfile.error.text

  const formInitialValues = {
    matchAgeRangeMin: pathOr(18, ['matchAgeRange', 'min'], user),
    matchAgeRangeMax: pathOr(21, ['matchAgeRange', 'max'], user),
    matchGenders: pathOr('FEMALE', ['matchGenders', 0], user),
    matchLocationRadius: user.matchLocationRadius,
    location: user.location,
  }

  const handleErrorClose = () => dispatch(usersActions.usersEditProfileIdle({}))

  return children({
    form: {
      handleFormSubmit,
      formInitialValues,
      formSubmitLoading,
      formSubmitDisabled,
      formErrorMessage,
      handleErrorClose,
    },
  })
}

export default DatingMatchService
