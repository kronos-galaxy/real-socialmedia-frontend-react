import { useEffect, useCallback } from 'react'
import { Keyboard } from 'react-native'
import * as signupActions from 'store/ducks/signup/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'
import { logEvent } from 'services/Analytics'
import { pageHeaderLeft } from 'navigation/options'
import testIDs from './test-ids'

const AuthEmailConfirmComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()

  const signupUsername = useSelector(state => state.signup.signupUsername)
  const signupEmail = useSelector(state => state.signup.signupEmail)
  const signupConfirm = useSelector(state => state.signup.signupConfirm)
  const signupCognitoIdentity = useSelector(state => state.signup.signupCognitoIdentity)

  /**
   * Navigation state reset on back button press
   */
  const handleGoBack = useCallback(() => {
    dispatch(signupActions.signupConfirmIdle({}))
    navigation.goBack()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => pageHeaderLeft({ 
        testID: testIDs.header.backBtn, 
        onPress: handleGoBack, 
      }),
    })
  }, [])

  const handleFormSubmit = (payload) => {
    logEvent('SIGNUP_CONFIRM_REQUEST')
    const nextPayload = {
      usernameType: 'email',
      confirmationCode: payload.confirmationCode,
      cognitoUsername: signupCognitoIdentity.cognitoUsername,
      cognitoUserId: signupCognitoIdentity.cognitoUserId,
      username: signupCognitoIdentity.username,
    }
    dispatch(signupActions.signupConfirmRequest(nextPayload))
  }

  /**
   * Create new user once email and password is received from previous steps
   * 
   * Previous steps include:
   * - signupUsername -> AuthUsernameScreen
   * - signupEmail -> AuthEmailScreen
   * - signupPassword -> AuthPasswordScreen
   */
  useEffect(() => {
    if (
      !signupUsername.payload.username ||
      !signupEmail.payload.email
    ) return
  }, [
    signupUsername.status,
    signupEmail.status,
  ])

  /**
   * Redirect to verification confirmation once signup was successful
   */
  useEffect(() => {
    if (
      signupConfirm.status !== 'success'
    ) return

    logEvent('SIGNUP_CONFIRM_SUCCESS')
    dispatch(signupActions.signupCreateIdle({}))
    dispatch(signupActions.signupConfirmIdle({}))
    dispatch(signupActions.signupUsernameIdle({}))
    dispatch(signupActions.signupPasswordIdle({}))
 
    Keyboard.dismiss()
  }, [
    signupConfirm.status,
  ])

  const formSubmitLoading = signupConfirm.status === 'loading'
  const formSubmitDisabled = signupConfirm.status === 'loading'
  const formErrorMessage = signupConfirm.error.text

  const formInitialValues = {
    cognitoUsername: path(['cognitoUsername'])(signupCognitoIdentity),
    confirmationCode: path(['params', 'confirmationCode'])(route),
  }

  const handleFormTransform = (values) => ({
    cognitoUsername: values.cognitoUsername,
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

export default AuthEmailConfirmComponentService
