import * as signupActions from 'store/ducks/signup/actions'
import { useDispatch, useSelector } from 'react-redux'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import replace from 'ramda/src/replace'
import pathOr from 'ramda/src/pathOr'
import { logEvent } from 'services/Analytics'

const AuthPhoneComponentService = ({ children }) => {
  const dispatch = useDispatch()

  const signupCheck = useSelector(state => state.signup.signupCheck)
  const signupPhone = useSelector(state => state.signup.signupPhone)
  const signupCreate = useSelector(state => state.signup.signupCreate)

  const handleFormSubmit = (payload) => {
    dispatch(signupActions.signupPhoneRequest(payload))

    /**
     *
     */
    logEvent('SIGNUP_CREATE_REQUEST')
    const signupCreatePayload = {
      username: signupCheck.payload.username,
      usernameType: 'phone',
      phone: `${payload.countryCode}${payload.phone}`,
      email: null,
    }
    dispatch(signupActions.signupCreateRequest(signupCreatePayload))
  }

  const formSubmitLoading = signupCreate.status === 'loading'
  const formSubmitDisabled = signupCreate.status === 'loading'
  const formErrorMessage = signupCreate.error.text

  const formInitialValues = {
    countryCode: '+1',
    phone: signupPhone.payload.phone,
  }

  const handleFormTransform = (values) => ({
    countryCode: compose(replace(/[^+0-9]/g, ''), trim, toLower, pathOr('', ['countryCode']))(values),
    phone: compose(replace(/[^0-9]/g, ''), trim, toLower, pathOr('', ['phone']))(values),
  })

  const handleErrorClose = () => dispatch(signupActions.signupCreateIdle({}))

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

export default AuthPhoneComponentService
