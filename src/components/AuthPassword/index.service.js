import { useEffect } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import { useDispatch, useSelector } from 'react-redux'
import { logEvent } from 'services/Analytics'

const AuthPasswordComponentService = ({ children }) => {
  const dispatch = useDispatch()

  const signupPassword = useSelector(state => state.signup.signupPassword)

  const onUnmount = () => {
    dispatch(signupActions.signupPasswordIdle())
  }

  useEffect(() => onUnmount, [])

  const handleFormSubmit = (payload) => {
    logEvent('SIGNUP_PASSWORD_REQUEST')
    dispatch(signupActions.signupPasswordRequest(payload))
  }

  const formSubmitLoading = signupPassword.status === 'loading'
  const formSubmitDisabled = signupPassword.status === 'loading'
  const formErrorMessage = signupPassword.error.text

  const formInitialValues = {
    password: signupPassword.payload.password,
  }

  const handleFormTransform = (values) => values

  const handleErrorClose = () => dispatch(signupActions.signupPasswordIdle({}))

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

export default AuthPasswordComponentService
