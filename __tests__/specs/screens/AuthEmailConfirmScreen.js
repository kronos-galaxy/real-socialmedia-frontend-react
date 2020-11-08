import React from 'react'
import AuthEmailConfirmScreen from 'screens/AuthEmailConfirmScreen'
import { renderWithStore, fireEvent, act } from 'tests/utils'
import * as signupActions from 'store/ducks/signup/actions'
import { useRoute } from '@react-navigation/native'
import * as Validation from 'services/Validation'
import { testField } from 'tests/utils/helpers'

jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn(), useRoute: jest.fn() }))
jest.spyOn(signupActions, 'signupConfirmRequest')
jest.spyOn(signupActions, 'signupConfirmIdle')

const email = 'valid@mail.com'
const confirmationCode = '123456'

const setup = () => {
  return renderWithStore(<AuthEmailConfirmScreen />)
}

describe('AuthEmailConfirmScreen', () => {
  afterEach(() => {
    signupActions.signupConfirmRequest.mockClear()
    signupActions.signupConfirmIdle.mockClear()
  })

  it('header', () => {
    const { getByText } = setup()

    expect(getByText('Enter 6-digit code')).toBeTruthy()
    expect(getByText('You’ve been sent a password reset token')).toBeTruthy()
  })

  it('form', () => {
    const { getByLabelText } = setup()

    testField(getByLabelText('confirmationCode'), {
      name: 'confirmationCode',
      value: undefined,
      ...Validation.getInputTypeProps('confirmationCode'),
    })
  })

  it('subtitle with email', async () => {
    const { getByText, store } = setup()

    await act(async () => {
      store.dispatch(signupActions.signupCreateRequest({ email }))
    })

    expect(getByText('Sent to valid@mail.com')).toBeTruthy()
  })

  it('get confirmationCode from route params', async () => {
    useRoute.mockReturnValueOnce({ params: { confirmationCode } })

    const { getByText } = setup()

    await act(async () => {
      fireEvent.press(getByText('Next'))
    })

    expect(signupActions.signupConfirmRequest).toHaveBeenCalledWith({
      confirmationCode: '123456',
      usernameType: 'email',
    })
  })

  it('submit form with valid values', async () => {
    const { getByText, getByLabelText } = setup()

    await act(async () => {
      fireEvent.changeText(getByLabelText('confirmationCode'), confirmationCode)
    })

    await act(async () => {
      fireEvent.press(getByText('Next'))
    })

    expect(signupActions.signupConfirmRequest).toHaveBeenCalledWith({
      confirmationCode: '123456',
      usernameType: 'email',
    })
  })

  it('clear reducer on unmount', () => {
    const { unmount } = setup()

    unmount()
    expect(signupActions.signupConfirmIdle).toHaveBeenCalled()
  })

  it('loading state', async () => {
    const { store, getByText } = setup()

    await act(async () => {
      store.dispatch(signupActions.signupConfirmRequest({}))
    })

    expect(getByText('Next')).toBeDisabled()
  })

  it('error state', async () => {
    const error = 'Error'
    const { store, queryByText, getByLabelText } = setup()

    await act(async () => {
      store.dispatch(signupActions.signupConfirmFailure({ message: { text: error } }))
    })

    expect(queryByText(error)).toBeTruthy()

    await act(async () => {
      fireEvent.press(getByLabelText('Close error'))
    })

    expect(queryByText(error)).toBeFalsy()
  })
})
