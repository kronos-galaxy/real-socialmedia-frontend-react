import * as authActions from 'store/ducks/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import * as authSelectors from 'store/ducks/auth/selectors'
import * as Validation from 'services/Validation'

const AuthForgotComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const authForgot = useSelector(authSelectors.authForgot)

  const handleFormTransform = (values) => ({
    email: Validation.getEmail(values),
  })

  const handleFormSubmit = (values, formApi) => {
    const nextValues = handleFormTransform(values)
    formApi.setValues(nextValues)

    dispatch(authActions.authForgotRequest({
      username: nextValues.email,
      email: nextValues.email,
    }))
  }

  const formSubmitLoading = authForgot.status === 'loading'
  const formSubmitDisabled = authForgot.status === 'loading'
  const formErrorMessage = authForgot.error.text
  const formInitialValues = handleFormTransform(authForgot.payload)

  const handleErrorClose = () => dispatch(authActions.authForgotIdle())

  return children({
    formErrorMessage,
    handleFormSubmit,
    handleErrorClose,
    formSubmitLoading,
    formSubmitDisabled,
    formInitialValues,
  })
}

export default AuthForgotComponentService
