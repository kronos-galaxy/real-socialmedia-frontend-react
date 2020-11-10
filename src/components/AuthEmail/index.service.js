import * as signupActions from 'store/ducks/signup/actions'
import { useDispatch, useSelector } from 'react-redux'
import * as Validation from 'services/Validation'
import * as signupSelectors from 'store/ducks/signup/selectors'

const AuthEmailComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const signupCreate = useSelector(signupSelectors.signupCreate)

  const handleFormTransform = (values) => ({
    email: Validation.getEmail(values),
  })

  const handleFormSubmit = (values, formApi) => {
    const nextValues = handleFormTransform(values)
    formApi.setValues(nextValues)
   
    dispatch(signupActions.signupCreateRequest({
      usernameType: 'email',
      email: nextValues.email,
    }))
  }

  const formSubmitLoading = signupCreate.status === 'loading'
  const formSubmitDisabled = signupCreate.status === 'loading'
  const formErrorMessage = signupCreate.error.text
  const formInitialValues = handleFormTransform(signupCreate.payload)

  const handleErrorClose = () => dispatch(signupActions.signupCreateIdle({}))

  return children({
    formErrorMessage,
    handleFormSubmit,
    handleErrorClose,
    formSubmitLoading,
    formSubmitDisabled,
    formInitialValues,
  })
}

export default AuthEmailComponentService
