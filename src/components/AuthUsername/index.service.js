import { useEffect } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import { useDispatch, useSelector } from 'react-redux'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'
import { logEvent } from 'services/Analytics'

const AuthUsernameComponentService = ({ children }) => {
  const dispatch = useDispatch()

  const signupUsername = useSelector(state => state.signup.signupUsername)

  const handleFormSubmit = (payload) => {
    logEvent('SIGNUP_CHECK_REQUEST')
    dispatch(signupActions.signupUsernameRequest(payload))
  }

  const handleClose = () => {
    dispatch(signupActions.signupUsernameIdle({}))
    dispatch(signupActions.signupCheckIdle({}))
  }

  const onUnmount = handleClose

  useEffect(() => onUnmount, [])

  const formSubmitLoading = signupUsername.status === 'loading'
  const formSubmitDisabled = signupUsername.status === 'loading'
  const formErrorMessage = signupUsername.error.text

  const formInitialValues = {
    username: signupUsername.payload.username,
  }

  const handleFormTransform = (values) => ({
    username: compose(trim, toLower, pathOr('', ['username']))(values),
  })

  const handleErrorClose = handleClose

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

export default AuthUsernameComponentService
