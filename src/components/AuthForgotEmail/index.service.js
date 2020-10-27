import { useEffect, useCallback, useContext } from 'react'
import * as authActions from 'store/ducks/auth/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { ThemeContext } from 'services/providers/Theme'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'
import { pageHeaderLeft } from 'navigation/options'

const AuthForgotComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { theme } = useContext(ThemeContext)

  const authForgot = useSelector(state => state.auth.authForgot)

  const handleFormSubmit = (payload) => {
    dispatch(authActions.authForgotRequest({
      username: toLower(payload.username),
    }))
  }

  /**
   * Navigation state reset on back button press
   */
  const handleGoBack = useCallback(() => {
    dispatch(authActions.authForgotIdle({}))
    navigationActions.navigateAuthHome(navigation)
  }, [])

  useEffect(() => {
    const tabNavigator = navigation.dangerouslyGetParent()
    if (!tabNavigator) return
    tabNavigator.setOptions({
      headerLeft: (props) => pageHeaderLeft({ ...props, onPress: handleGoBack, theme }),
    })
  }, [])

  const formSubmitLoading = authForgot.status === 'loading'
  const formSubmitDisabled = authForgot.status === 'loading'
  const formErrorMessage = authForgot.error.text

  const formInitialValues = {
    username: authForgot.payload.username,
  }

  const handleFormTransform = (values) => ({
    username: compose(trim, toLower, pathOr('', ['username']))(values),
  })

  const handleErrorClose = () => dispatch(authActions.authForgotIdle({}))

  return children({
    formErrorMessage,
    handleFormSubmit,
    handleFormTransform,
    handleErrorClose,
    formSubmitLoading,
    formSubmitDisabled,
    formInitialValues,
  })
}

export default AuthForgotComponentService
