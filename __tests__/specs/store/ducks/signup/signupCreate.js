import { expectSaga } from 'redux-saga-test-plan'
import { getContext } from 'redux-saga/effects'
import * as actions from 'store/ducks/signup/actions'
import * as authActions from 'store/ducks/auth/actions'
import { testAsRootSaga, testNavigate } from 'tests/utils/helpers'
import signupCreate from 'store/ducks/signup/saga/signupCreate'
import { logEvent } from 'services/Analytics'
import * as queryService from 'services/Query'
import * as queries from 'store/ducks/signup/queries'

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))
const navigation = { navigate: jest.fn() }
const email = 'valid@mail.com'

describe('signupCreate', () => {
  afterEach(() => {
    navigation.navigate.mockClear()
    queryService.apiRequest.mockClear()
    logEvent.mockClear()
  })
  
  describe('success', () => {
    it('email', async () => {
      const usernameType = 'email'
      const message = { code: 'GENERIC', text: 'Successfully create account', nativeError: '' }

      await expectSaga(testAsRootSaga(signupCreate))
        .provide([[getContext('ReactNavigationRef'), { current: navigation }]])

        .put(authActions.authTokenRequest({ allowAnonymous: true }))
        .put(authActions.authDataRequest({ allowAnonymous: true }))
        .put(actions.signupCreateSuccess({ message, usernameType }))

        .dispatch(actions.signupCreateRequest({ usernameType, email }))
        .dispatch(authActions.authTokenSuccess())
        .dispatch(authActions.authDataSuccess())

        .silentRun()

      expect(queryService.apiRequest).toHaveBeenCalledWith(queries.startChangeUserEmail, { email })

      expect(logEvent).toHaveBeenCalledWith('SIGNUP_CREATE_REQUEST')
      expect(logEvent).toHaveBeenCalledWith('SIGNUP_EMAIL_SUCCESS')

      testNavigate(navigation, 'Auth.AuthEmailConfirm')
    })

    it('phone', async () => {
      const countryCode = '+1'
      const phone = '1234567'
      const phoneNumber = `${countryCode}${phone}`
      const usernameType = 'phone'
      const message = { code: 'GENERIC', text: 'Successfully create account', nativeError: '' }

      await expectSaga(testAsRootSaga(signupCreate))
        .provide([[getContext('ReactNavigationRef'), { current: navigation }]])

        .put(authActions.authTokenRequest({ allowAnonymous: true }))
        .put(authActions.authDataRequest({ allowAnonymous: true }))
        .put(actions.signupCreateSuccess({ message, usernameType }))

        .dispatch(actions.signupCreateRequest({ usernameType, countryCode, phone }))
        .dispatch(authActions.authTokenSuccess())
        .dispatch(authActions.authDataSuccess())

        .silentRun()

      expect(queryService.apiRequest).toHaveBeenCalledWith(queries.startChangeUserPhoneNumber, { phoneNumber })

      expect(logEvent).toHaveBeenCalledWith('SIGNUP_CREATE_REQUEST')
      expect(logEvent).toHaveBeenCalledWith('SIGNUP_PHONE_SUCCESS')

      testNavigate(navigation, 'Auth.AuthPhoneConfirm')
    })
  })

  describe('failure', () => {
    it('Unsupported usernameType', async () => {
      const nativeError = 'Unsupported usernameType'
      const message = { code: 'GENERIC', text: 'Failed to create account', nativeError }

      await expectSaga(testAsRootSaga(signupCreate))
        .not.put.like(actions.signupCreateSuccess())
        .put(actions.signupCreateFailure({ message }))

        .dispatch(actions.signupCreateRequest({ usernameType: undefined, email }))
        .dispatch(authActions.authTokenSuccess())
        .dispatch(authActions.authDataSuccess())

        .silentRun()
    })

    it('Failed to obtain token', async () => {
      const nativeError = 'Failed to obtain token'
      const message = { code: 'GENERIC', text: 'Failed to create account', nativeError }

      await expectSaga(testAsRootSaga(signupCreate))
        .not.put.like(actions.signupCreateSuccess())
        .put(actions.signupCreateFailure({ message }))

        .dispatch(actions.signupCreateRequest({ usernameType: undefined, email }))
        .dispatch(authActions.authTokenFailure())

        .silentRun()
    })

    it('Failed to fetch data', async () => {
      const nativeError = 'Failed to fetch data'
      const message = { code: 'GENERIC', text: 'Failed to create account', nativeError }

      await expectSaga(testAsRootSaga(signupCreate))
        .not.put.like(actions.signupCreateSuccess())
        .put(actions.signupCreateFailure({ message }))

        .dispatch(actions.signupCreateRequest({ usernameType: undefined, email }))
        .dispatch(authActions.authTokenSuccess())
        .dispatch(authActions.authDataFailure())

        .silentRun()
    })

    it('USER_CONFIRMATION_DELIVERY', async () => {
      const nativeError = 'USER_CONFIRMATION_DELIVERY'
      const message = { code: nativeError, text: 'Failed to deliver confirmation code', nativeError }
      queryService.apiRequest.mockRejectedValueOnce(new Error(nativeError))

      await expectSaga(testAsRootSaga(signupCreate))
        .not.put.like(actions.signupCreateSuccess())
        .put(actions.signupCreateFailure({ message }))

        .dispatch(actions.signupCreateRequest({ usernameType: 'email', email }))
        .dispatch(authActions.authTokenSuccess())
        .dispatch(authActions.authDataSuccess())

        .silentRun()
    })

    it('UsernameExistsException', async () => {
      const nativeError = 'UsernameExistsException'
      const message = { code: 'GENERIC', text: 'Failed to create account', nativeError }
      queryService.apiRequest.mockRejectedValueOnce(new Error(nativeError))

      await expectSaga(testAsRootSaga(signupCreate))
        .not.put.like(actions.signupCreateSuccess())
        .put(actions.signupCreateFailure({ message }))

        .dispatch(actions.signupCreateRequest({ usernameType: 'email', email }))
        .dispatch(authActions.authTokenSuccess())
        .dispatch(authActions.authDataSuccess())

        .silentRun()
    })

    it('InvalidPasswordException', async () => {
      const nativeError = 'InvalidPasswordException'
      const message = { code: 'GENERIC', text: 'Failed to create account', nativeError }
      queryService.apiRequest.mockRejectedValueOnce(new Error(nativeError))

      await expectSaga(testAsRootSaga(signupCreate))
        .not.put.like(actions.signupCreateSuccess())
        .put(actions.signupCreateFailure({ message }))

        .dispatch(actions.signupCreateRequest({ usernameType: 'email', email }))
        .dispatch(authActions.authTokenSuccess())
        .dispatch(authActions.authDataSuccess())

        .silentRun()
    })

    it('InvalidParameterException', async () => {
      const nativeError = 'InvalidParameterException'
      const message = { code: 'GENERIC', text: 'Failed to create account', nativeError }
      queryService.apiRequest.mockRejectedValueOnce(new Error(nativeError))

      await expectSaga(testAsRootSaga(signupCreate))
        .not.put.like(actions.signupCreateSuccess())
        .put(actions.signupCreateFailure({ message }))

        .dispatch(actions.signupCreateRequest({ usernameType: 'email', email }))
        .dispatch(authActions.authTokenSuccess())
        .dispatch(authActions.authDataSuccess())

        .silentRun()
    })
  })
})
