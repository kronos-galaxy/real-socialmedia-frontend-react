import * as signupActions from 'store/ducks/signup/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'
import { logEvent } from 'services/Analytics'

const AuthPhoneConfirmComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const route = useRoute()

  const signupConfirm = useSelector(state => state.signup.signupConfirm)
  const signupCreate = useSelector(state => state.signup.signupCreate)

  const handleFormSubmit = (payload) => {
    logEvent('SIGNUP_CONFIRM_REQUEST')
    const nextPayload = {
      usernameType: 'phone',
      confirmationCode: payload.confirmationCode,
    }
    dispatch(signupActions.signupConfirmRequest(nextPayload))
  }

  const formSubmitLoading = signupConfirm.status === 'loading'
  const formSubmitDisabled = signupConfirm.status === 'loading'
  const formErrorMessage = signupConfirm.error.text

  const formInitialValues = {
    cognitoUsername: path(['payload', 'phone'])(signupCreate),
    confirmationCode: path(['params', 'confirmationCode'])(route),
  }

  const handleFormTransform = (values) => ({
    confirmationCode: values.confirmationCode,
  })

  const handleErrorClose = () => dispatch(signupActions.signupConfirmIdle({}))

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

export default AuthPhoneConfirmComponentService
