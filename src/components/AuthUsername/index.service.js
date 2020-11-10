import { useEffect } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import { useDispatch, useSelector } from 'react-redux'
import * as Validation from 'services/Validation'

const AuthUsernameComponentService = ({ children }) => {
  const dispatch = useDispatch()

  const signupUsername = useSelector(state => state.signup.signupUsername)

  const handleFormTransform = (values) => ({
    username: Validation.getUsername(values),
  })

  const handleFormSubmit = (values, formApi) => {
    const nextValues = handleFormTransform(values)
    formApi.setValues(nextValues)

    dispatch(signupActions.signupUsernameRequest(nextValues))
  }

  const handleClose = () => {
    dispatch(signupActions.signupUsernameIdle())
  }

  const onUnmount = handleClose

  useEffect(() => onUnmount, [])

  const formSubmitLoading = signupUsername.status === 'loading'
  const formSubmitDisabled = signupUsername.status === 'loading'
  const formErrorMessage = signupUsername.error.text
  const formInitialValues = handleFormTransform(signupUsername.payload)

  const handleErrorClose = handleClose

  return children({
    formErrorMessage,
    handleFormSubmit,
    handleErrorClose,
    formSubmitLoading,
    formSubmitDisabled,
    formInitialValues,
  })
}

export default AuthUsernameComponentService
