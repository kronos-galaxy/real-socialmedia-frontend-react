import { getContext } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import * as actions from 'store/ducks/auth/actions'
import authForgot from 'store/ducks/auth/saga/authForgot'
import { testAsRootSaga, testNavigate } from 'tests/utils/helpers'
import { logEvent } from 'services/Analytics'

const AwsAuth = { forgotPassword: jest.fn() }
const navigation = { current: { navigate: jest.fn() } }
const phone = '12345678'
const countryCode = '+7'
const email = 'test@mail.com'

describe('authForgot', () => {
  afterEach(() => {
    AwsAuth.forgotPassword.mockClear()
  })

  describe('success', () => {
    it('phone', async () => {
      AwsAuth.forgotPassword.mockResolvedValueOnce(true)
      const username = `${countryCode}${phone}`

      await expectSaga(testAsRootSaga(authForgot))
        .provide([
          [getContext('AwsAuth'), AwsAuth],
          [getContext('ReactNavigationRef'), navigation],
        ])

        .put(actions.authForgotSuccess())

        .dispatch(actions.authForgotRequest({ username, phone, countryCode }))
        .silentRun()

      expect(AwsAuth.forgotPassword).toHaveBeenCalledWith(username)
      testNavigate(navigation.current, 'Auth.AuthForgotConfirm')
      expect(logEvent).toHaveBeenCalledWith('authForgotSuccess')
    })

    it('email', async () => {
      AwsAuth.forgotPassword.mockResolvedValueOnce(true)

      await expectSaga(testAsRootSaga(authForgot))
        .provide([
          [getContext('AwsAuth'), AwsAuth],
          [getContext('ReactNavigationRef'), navigation],
        ])

        .put(actions.authForgotSuccess())

        .dispatch(actions.authForgotRequest({ username: email, email }))
        .silentRun()

      expect(AwsAuth.forgotPassword).toHaveBeenCalledWith(email)
      testNavigate(navigation.current, 'Auth.AuthForgotConfirm')
      expect(logEvent).toHaveBeenCalledWith('authForgotSuccess')
    })
  })

  describe('failure', () => {
    it('UserNotFoundException', async () => {
      AwsAuth.forgotPassword.mockRejectedValueOnce({ code: 'UserNotFoundException' })
      const message = { code: 'USER_NOT_FOUND', text: 'User does not exist', nativeError: '' }

      await expectSaga(testAsRootSaga(authForgot))
        .provide([
          [getContext('AwsAuth'), AwsAuth],
          [getContext('ReactNavigationRef'), navigation],
        ])

        .put(actions.authForgotFailure({ message }))

        .dispatch(actions.authForgotRequest({ username: email, email }))
        .silentRun()
    })

    it('Generic', async () => {
      AwsAuth.forgotPassword.mockRejectedValueOnce(new Error('Error'))
      const message = { code: 'GENERIC', text: 'Failed to reset the password', nativeError: 'Error' }

      await expectSaga(testAsRootSaga(authForgot))
        .provide([
          [getContext('AwsAuth'), AwsAuth],
          [getContext('ReactNavigationRef'), navigation],
        ])

        .put(actions.authForgotFailure({ message }))

        .dispatch(actions.authForgotRequest({ username: email, email }))
        .silentRun()
    })
  })
})
