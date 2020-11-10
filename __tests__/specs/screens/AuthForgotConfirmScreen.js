import React from 'react'
import AuthForgotConfirmScreen from 'screens/AuthForgotConfirmScreen'
import { renderWithStore, fireEvent, act } from 'tests/utils'
import * as authActions from 'store/ducks/auth/actions'
import { testField, testNavigate } from 'tests/utils/helpers'
import * as Validation from 'services/Validation'
import { useNavigation } from '@react-navigation/native'

const navigation = { navigate: jest.fn() }

jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn(), useRoute: jest.fn() }))
jest.spyOn(authActions, 'authForgotConfirmIdle')
useNavigation.mockReturnValue(navigation)

const email = 'valid@mail.com'
const password = '12345678'
const confirmationCode = '123456'

const setup = () => {
  return renderWithStore(<AuthForgotConfirmScreen />)
}

describe('AuthForgotConfirmScreen', () => {
  afterEach(() => {
    authActions.authForgotConfirmIdle.mockClear()
  })

  it('header', () => {
    const { getByText } = setup()

    expect(getByText('Enter 6-digit code')).toBeTruthy()
    expect(getByText('You’ve been sent a password reset token')).toBeTruthy()
  })

  it('footer', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Already Have an Account? Log In'))
    testNavigate(navigation, 'Auth.Signin.AuthSigninPhone')
  })

  it('form', () => {
    const { getByLabelText } = setup()

    testField(getByLabelText('username'), {
      name: 'username',
      value: '',
      ...Validation.getInputTypeProps('username'),
    })

    testField(getByLabelText('confirmationCode'), {
      name: 'confirmationCode',
      value: '',
      ...Validation.getInputTypeProps('confirmationCode'),
    })

    testField(getByLabelText('password'), {
      name: 'password',
      value: '',
      ...Validation.getInputTypeProps('password'),
    })
  })

  it('submit form with valid values', async () => {
    const authForgotConfirmRequest = jest.spyOn(authActions, 'authForgotConfirmRequest')

    const { getByText, getByLabelText } = setup()

    await act(async () => {
      fireEvent.changeText(getByLabelText('username'), email)
      fireEvent.changeText(getByLabelText('confirmationCode'), confirmationCode)
      fireEvent.changeText(getByLabelText('password'), password)
    })

    await act(async () => {
      fireEvent.press(getByText('Next'))
    })

    expect(authForgotConfirmRequest).toHaveBeenCalledWith({
      username: email,
      confirmationCode,
      password,
    })

    authForgotConfirmRequest.mockRestore()
  })

  it('initial values', async () => {
    const { getByLabelText, getByText, store } = setup()

    await act(async () => {
      store.dispatch(authActions.authForgotRequest({ username: email }))
    })

    expect(getByText('Sent to valid@mail.com')).toBeTruthy()
    expect(getByLabelText('username').props.value).toBe(email)
  })

  it('loading state', async () => {
    const { store, getByText } = setup()

    await act(async () => {
      store.dispatch(authActions.authForgotConfirmRequest({ username: email }))
    })

    expect(getByText('Next')).toBeDisabled()
  })

  it('error state', async () => {
    const error = 'Error'
    const { store, queryByText, getByLabelText } = setup()

    await act(async () => {
      store.dispatch(authActions.authForgotConfirmFailure({ message: { text: error } }))
    })

    expect(queryByText(error)).toBeTruthy()

    await act(async () => {
      fireEvent.press(getByLabelText('Close error'))
    })

    expect(queryByText(error)).toBeFalsy()
  })

  it('clear reducer on unmount', () => {
    const { unmount } = setup()

    unmount()
    expect(authActions.authForgotConfirmIdle).toHaveBeenCalled()
  })
})
