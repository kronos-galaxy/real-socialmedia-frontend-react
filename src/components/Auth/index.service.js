import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authActions from 'store/ducks/auth/actions'
import { withNavigation } from 'react-navigation'
import toLower from 'ramda/src/toLower'

const AuthComponentService = ({ children, navigation }) => {
  const guessUsernameType = (username) => {
    const hasEmail = /\S+@\S+\.\S+/.test(username)
    const hasPhone = /^[0-9 ()+-]+$/.test(username)

    return (() => {
      if (hasEmail) return 'email'
      if (hasPhone) return 'phone'
      return 'username'
    })()
  }

  const dispatch = useDispatch()
  const authCheck = useSelector(state => state.auth.authCheck)
  const authFacebook = useSelector(state => state.auth.authFacebook)
  const authGoogle = useSelector(state => state.auth.authGoogle)
  const authSignin = useSelector(state => state.auth.authSignin)
  const authSignup = useSelector(state => state.auth.authSignup)
  const authSignupConfirm = useSelector(state => state.auth.authSignupConfirm)
  const authOnboard = useSelector(state => state.auth.authOnboard)
  const authForgot = useSelector(state => state.auth.authForgot)
  const authSignout = useSelector(state => state.auth.authSignout)
  const authForgotConfirm = useSelector(state => state.auth.authForgotConfirm)

  const authFacebookRequest = () => 
    dispatch(authActions.authFacebookRequest())
  
  const authGoogleRequest = () => 
    dispatch(authActions.authGoogleRequest())
  
  const authSigninRequest = (payload) => {
    const usernameType = guessUsernameType(payload.username)
    dispatch(authActions.authSigninRequest({
      usernameType,
      username: toLower(payload.username),
      password: payload.password,
    }))
  }
  
  const authSigninIdle = () => 
    dispatch(authActions.authSigninIdle())

  const authSignupRequest = () => {
    const usernameType = guessUsernameType(authSignin.payload.username)
    dispatch(authActions.authSignupRequest({
      usernameType,
      password: authSignin.payload.password,
      email: toLower(authSignin.payload.username),
      phone: authSignin.payload.username,
    }))
  }

  const authSignupIdle = () => 
    dispatch(authActions.authSignupIdle())

  const authSignupResendRequest = () => {
    dispatch(authActions.authSignupResendRequest({
      username: authSignin.payload.username,
    }))
  }

  const authSignupResendIdle = () => 
    dispatch(authActions.authSignupResendIdle())

  const authSignupConfirmRequest = (payload) => {
    dispatch(authActions.authSignupConfirmRequest({
      username: authSignup.data.username,
      password: authSignup.payload.password,
      confirmationCode: payload.confirmationCode,
    }))
  }

  const authOnboardRequest = (payload) => {
    dispatch(authActions.authOnboardRequest({
      username: toLower(payload.username),
      fullName: payload.fullName,
    }))
  }

  const authOnboardIdle = () =>
    dispatch(authActions.authOnboardIdle())

  const authForgotRequest = (payload) =>
    dispatch(authActions.authForgotRequest({
      username: toLower(payload.username),
    }))

  const authForgotIdle = () =>
    dispatch(authActions.authForgotIdle())

  const authForgotConfirmRequest = (payload) =>
    dispatch(authActions.authForgotConfirmRequest({
      username: toLower(payload.username),
      code: payload.code,
      password: payload.password,
    }))

  const authForgotConfirmIdle = () =>
    dispatch(authActions.authForgotConfirmIdle())

  const authSignoutRequest = (payload) =>
    dispatch(authActions.authSignoutRequest(payload))

  useEffect(() => {
    /**
     * Authorization for existing user
     */
    if (authSignupConfirm.status === 'success') {
      navigation.navigate('Auth')
      dispatch(authActions.authSignupIdle())
      dispatch(authActions.authSigninIdle())
      dispatch(authActions.authSignupConfirmIdle())
      dispatch(authActions.authCheckIdle())
    }

    if (authOnboard.status === 'success') {
      navigation.navigate('Feed')
      dispatch(authActions.authSignupIdle())
      dispatch(authActions.authSigninIdle())
      dispatch(authActions.authSignupConfirmIdle())
      dispatch(authActions.authCheckIdle({ nextRoute: 'AvatarPicker' }))
    }

    if (authForgot.status === 'success') {
      navigation.navigate('AuthForgotConfirm')
      dispatch(authActions.authForgotIdle())
    }

    if (authForgotConfirm.status === 'success') {
      navigation.navigate('Auth')
      dispatch(authActions.authForgotConfirmIdle())
    }
  }, [
    authSignupConfirm.status,
    authOnboard.status,
    authForgot.status,
    authForgotConfirm.status,
  ])

  useEffect(() => {
    if (authSignup.status === 'success') {
      navigation.navigate('AuthSignupConfirm')
    }

    if (authSignup.status === 'failure' && authSignup.nextRoute) {
      navigation.navigate(authSignup.nextRoute)
      authSignupResendRequest()
    }
  }, [
    authSignup.status,
  ])

  useEffect(() => {
    if (authFacebook.status === 'success') {
      dispatch(authActions.authCheckRequest(authFacebook.data))
      dispatch(authActions.authFacebookIdle())
      dispatch(authActions.authSignupIdle())
      dispatch(authActions.authSigninIdle())
      dispatch(authActions.authSignupConfirmIdle())
      dispatch(authActions.authCheckIdle())
    }

    if (authGoogle.status === 'success') {
      dispatch(authActions.authCheckRequest(authGoogle.data))
      dispatch(authActions.authGoogleIdle())
      dispatch(authActions.authSignupIdle())
      dispatch(authActions.authSigninIdle())
      dispatch(authActions.authSignupConfirmIdle())
      dispatch(authActions.authCheckIdle())
    }
  }, [
    authFacebook.status,
    authGoogle.status,
  ])
  
  useEffect(() => {
    if (authSignin.status === 'success') {
      dispatch(authActions.authCheckRequest({}))
      dispatch(authActions.authSigninIdle())
    }

    if (authSignin.status === 'failure' && authSignin.nextRoute) {
      navigation.navigate(authSignin.nextRoute)
      dispatch(authActions.authSigninIdle())
    }
  }, [
    authSignin.status,
  ])

  useEffect(() => {
    if (navigation.getParam('username') && navigation.getParam('confirmationCode')) {
      dispatch(authActions.authSignupConfirmRequest({
        username: toLower(navigation.getParam('username')),
        confirmationCode: navigation.getParam('confirmationCode'),
      }))
    }
  }, [
    navigation.getParam('action') === 'signupConfirm',
    navigation.getParam('username'),
    navigation.getParam('confirmationCode'),
  ])

  return children({
    authCheck,
    authFacebook,
    authFacebookRequest,
    authGoogle,
    authGoogleRequest,
    authSignin,
    authSigninRequest,
    authSigninIdle,
    authSignup,
    authSignupRequest,
    authSignupIdle,
    authSignupConfirm,
    authSignupConfirmRequest,
    authOnboard,
    authOnboardRequest,
    authOnboardIdle,
    authForgot,
    authForgotRequest,
    authForgotIdle,
    authForgotConfirm,
    authForgotConfirmRequest,
    authForgotConfirmIdle,
    authSignout,
    authSignoutRequest,
  })
}

export default withNavigation(AuthComponentService)
