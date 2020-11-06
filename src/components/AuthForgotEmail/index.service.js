import * as authActions from 'store/ducks/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'

const AuthForgotComponentService = ({ children }) => {
  const dispatch = useDispatch()

  const authForgot = useSelector(state => state.auth.authForgot)

  const handleFormSubmit = (payload) => {
    dispatch(authActions.authForgotRequest({
      username: toLower(payload.username),
    }))
  }

  const formSubmitLoading = authForgot.status === 'loading'
  const formSubmitDisabled = authForgot.status === 'loading'
  const formErrorMessage = authForgot.error.text

  const formInitialValues = {
    username: authForgot.payload.username,
  }

  const handleFormTransform = (values) => ({
    username: compose(trim, toLower, pathOr('', ['username']))(values),
  })

  const handleErrorClose = () => dispatch(authActions.authForgotIdle({}))

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

export default AuthForgotComponentService
