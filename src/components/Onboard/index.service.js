import { useSelector, useDispatch } from 'react-redux'
import * as authActions from 'store/ducks/auth/actions'
import { withNavigation } from 'react-navigation'

const AuthOnboardService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const authFacebook = useSelector(state => state.auth.authFacebook)
  const authSignin = useSelector(state => state.auth.authSignin)
  const authSignup = useSelector(state => state.auth.authSignup)
  const authSignupConfirm = useSelector(state => state.auth.authSignupConfirm)

  const authFacebookRequest = () => 
    dispatch(authActions.authFacebookRequest())
  
  const authSigninRequest = (payload) => 
    dispatch(authActions.authSigninRequest(payload))

  const authSignupRequest = (payload) => 
    dispatch(authActions.authSignupRequest(payload))

  const authSignupConfirmRequest = (payload) => 
    dispatch(authActions.authSignupConfirmRequest(payload))
  
  return children({
    authFacebook,
    authFacebookRequest,
    authSignin,
    authSigninRequest,
    authSignup,
    authSignupRequest,
    authSignupConfirm,
    authSignupConfirmRequest,
  })
}

export default withNavigation(AuthOnboardService)
