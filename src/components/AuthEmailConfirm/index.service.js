import { useEffect } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import { useDispatch, useSelector } from 'react-redux'
import {  useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'
import * as signupSelectors from 'store/ducks/signup/selectors'
import * as Validation from 'services/Validation'

const AuthEmailConfirmComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const route = useRoute() 

  const signupConfirm = useSelector(signupSelectors.signupConfirm)
  const signupCreate = useSelector(signupSelectors.signupCreate)

  const onUnmount = () => {
    dispatch(signupActions.signupConfirmIdle())
  } 
  
  useEffect(() => onUnmount, [])

  const handleFormTransform = (values) => ({
    confirmationCode: Validation.getConfirmationCode(values),
  })

  const handleFormSubmit = (values) => {
    const nextValues = handleFormTransform(values)

    dispatch(signupActions.signupConfirmRequest({
      usernameType: 'email',
      confirmationCode: nextValues.confirmationCode,
    }))
  }

  const formSubmitLoading = signupConfirm.status === 'loading'
  const formSubmitDisabled = signupConfirm.status === 'loading'
  const formErrorMessage = signupConfirm.error.text

  const formInitialValues = {
    cognitoUsername: path(['payload', 'email'])(signupCreate),
    confirmationCode: path(['params', 'confirmationCode'])(route),
  }

  const handleErrorClose = () => dispatch(signupActions.signupConfirmIdle({}))

  return children({
    formErrorMessage,
    handleFormSubmit,
    handleErrorClose,
    formSubmitLoading,
    formSubmitDisabled,
    formInitialValues,
  })
}

export default AuthEmailConfirmComponentService
