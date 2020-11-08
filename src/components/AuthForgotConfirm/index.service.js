import { useEffect } from 'react'
import * as authActions from 'store/ducks/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import * as authSelectors from 'store/ducks/auth/selectors'
import * as Validation from 'services/Validation'

const AuthForgotConfirmComponentService = ({ children }) => {
  const dispatch = useDispatch()

  const authForgot = useSelector(authSelectors.authForgot)
  const authForgotConfirm = useSelector(state => state.auth.authForgotConfirm)

  const handleFormTransform = (values) => ({
    username: Validation.getUsername(values),
    confirmationCode: Validation.getConfirmationCode(values),
    password: Validation.getPassword(values),
  })

  const handleFormSubmit = (values, formApi) => {
    const nextValues = handleFormTransform(values)
    formApi.setValues(nextValues)
    
    dispatch(authActions.authForgotConfirmRequest(nextValues))
  }

  const onUnmount = () => {
    dispatch(authActions.authForgotConfirmIdle())
  }

  useEffect(() => onUnmount, [])

  const formSubmitLoading = authForgotConfirm.status === 'loading'
  const formSubmitDisabled = authForgotConfirm.status === 'loading'
  const formErrorMessage = authForgotConfirm.error.text
  const formInitialValues = handleFormTransform(authForgot.payload)

  const handleErrorClose = () => dispatch(authActions.authForgotConfirmIdle())

  return children({
    formErrorMessage,
    handleFormSubmit,
    handleErrorClose,
    formSubmitLoading,
    formSubmitDisabled,
    formInitialValues,
  })
}

export default AuthForgotConfirmComponentService
