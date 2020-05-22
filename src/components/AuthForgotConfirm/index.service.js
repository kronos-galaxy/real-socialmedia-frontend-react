import { useEffect } from 'react'
import * as authActions from 'store/ducks/auth/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'

const AuthForgotConfirmComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()

  const authForgot = useSelector(state => state.auth.authForgot)
  const authForgotConfirm = useSelector(state => state.auth.authForgotConfirm)

  const handleFormSubmit = (payload) => {
    dispatch(authActions.authForgotConfirmRequest({
      username: payload.username,
      code: payload.confirmationCode,
      password: payload.password,
    }))
  }

  /**
   * Redirect to verification confirmation once reset was successful
   */
  useEffect(() => {
    if (
      authForgotConfirm.status !== 'success'
    ) return

    navigationActions.navigateAuthSignin(navigation)()
  }, [
    authForgotConfirm.status === 'success',
  ])

  const formSubmitLoading = authForgotConfirm.status === 'loading'
  const formSubmitDisabled = authForgotConfirm.status === 'loading'
  const formErrorMessage = authForgotConfirm.error.text

  const formInitialValues = {
    username: compose(trim, toLower)(authForgot.payload.username),
  }

  const handleFormTransform = (values) => ({
    username: compose(trim, toLower, pathOr('', ['username']))(values),
    confirmationCode: compose(trim, toLower, pathOr('', ['confirmationCode']))(values),
    password: values.password,
  })

  const handleErrorClose = () => dispatch(authActions.authForgotConfirmIdle())

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

export default AuthForgotConfirmComponentService