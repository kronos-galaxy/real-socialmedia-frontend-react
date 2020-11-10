import * as signupActions from 'store/ducks/signup/actions'
import { useDispatch, useSelector } from 'react-redux'
import * as Validation from 'services/Validation'

const AuthPhoneComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const signupCreate = useSelector(state => state.signup.signupCreate)

  const handleFormTransform = (values) => ({
    countryCode: Validation.getCountryCode(values),
    phone: Validation.getPhone(values),
  })

  const handleFormSubmit = (values) => {
    const nextValues = handleFormTransform(values)

    dispatch(signupActions.signupCreateRequest({
      usernameType: 'phone',
      countryCode: nextValues.countryCode,
      phone: nextValues.phone,
    }))
  }

  const formSubmitLoading = signupCreate.status === 'loading'
  const formSubmitDisabled = signupCreate.status === 'loading'
  const formErrorMessage = signupCreate.error.text
  const formInitialValues = handleFormTransform(signupCreate.payload)

  const handleErrorClose = () => dispatch(signupActions.signupCreateIdle())

  return children({
    formErrorMessage,
    handleFormSubmit,
    handleErrorClose,
    formSubmitLoading,
    formSubmitDisabled,
    formInitialValues,
  })
}

export default AuthPhoneComponentService
