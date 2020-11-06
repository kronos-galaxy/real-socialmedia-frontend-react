import * as signupActions from 'store/ducks/signup/actions'
import { useDispatch, useSelector } from 'react-redux'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'
import { logEvent } from 'services/Analytics'

const AuthEmailComponentService = ({ children }) => {
  const dispatch = useDispatch()

  const signupCheck = useSelector(state => state.signup.signupCheck)
  const signupEmail = useSelector(state => state.signup.signupEmail)
  const signupCreate = useSelector(state => state.signup.signupCreate)

  const handleFormSubmit = (payload) => {
    dispatch(signupActions.signupEmailRequest(payload))

    /**
     *
     */
    logEvent('SIGNUP_CREATE_REQUEST')
    const signupCreatePayload = {
      username: signupCheck.payload.username,
      usernameType: 'email',
      phone: null,
      email: payload.email,
    }
    dispatch(signupActions.signupCreateRequest(signupCreatePayload))
  }

  const formSubmitLoading = signupCreate.status === 'loading'
  const formSubmitDisabled = signupCreate.status === 'loading'
  const formErrorMessage = signupCreate.error.text

  const formInitialValues = {
    email: signupEmail.payload.email,
  }

  const handleFormTransform = (values) => ({
    email: compose(trim, toLower, pathOr('', ['email']))(values),
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

export default AuthEmailComponentService
