import * as Validation from 'services/Validation'
import { repeat, join, times } from 'ramda'
import API from '@aws-amplify/api'
import * as usersQueries from 'store/ducks/users/queries'

jest.mock('@aws-amplify/api', () => ({
  graphql: jest.fn().mockResolvedValue({ data: { usernameStatus: 'AVAILABLE' } }),
  graphqlOperation: jest.fn().mockResolvedValue(true),
}))

describe('Validation service', () => {
  afterEach(() => {
    API.graphql.mockClear()
    API.graphqlOperation.mockClear()
  })

  it('getPhone', () => {
    expect(Validation.getPhone({})).toBe('')
    expect(Validation.getPhone({ phone: ' 1232WDEWE4234 ' })).toBe('12324234')
  })

  it('getCountryCode', () => {
    expect(Validation.getCountryCode({})).toBe('+1')
    expect(Validation.getCountryCode({ countryCode: ' Wcsw2 ' })).toBe('2')
  })

  it('getEmail', () => {
    expect(Validation.getEmail({})).toBe('')
    expect(Validation.getEmail({ email: ' VAlid@mail.com ' })).toBe('valid@mail.com')
  })

  it('getUsername', () => {
    expect(Validation.getUsername({})).toBe('')
    expect(Validation.getUsername({ username: ' useRname ' })).toBe('username')
  })

  it('getPassword', () => {
    expect(Validation.getPassword({})).toBe('')
    expect(Validation.getPassword({ password: ' passWord ' })).toBe('passWord')
  })

  it('getConfirmationCode', () => {
    expect(Validation.getConfirmationCode({})).toBe('')
    expect(Validation.getConfirmationCode({ confirmationCode: ' coDe123 ' })).toBe('123')
  })

  it('email', async () => {
    expect(await Validation.email.isValid(undefined)).toBeFalsy()
    expect(await Validation.email.isValid('')).toBeFalsy()
    expect(await Validation.email.isValid('1')).toBeFalsy()
    expect(await Validation.email.isValid('12')).toBeFalsy()
    expect(await Validation.email.isValid('valid@mail.com')).toBeTruthy()
    expect(await Validation.email.cast(' trim ')).toBe('trim')
    expect(await Validation.email.isValid('with white space@mail.com')).toBeFalsy()
  })

  it('password', async () => {
    expect(await Validation.password.isValid(undefined)).toBeFalsy()
    expect(await Validation.password.isValid('')).toBeFalsy()
    expect(await Validation.password.isValid('1')).toBeFalsy()
    expect(await Validation.password.isValid('1234567')).toBeFalsy()
    expect(await Validation.password.isValid('12345678')).toBeTruthy()
    expect(await Validation.password.cast(' trim ')).toBe('trim')
  })

  it('confirmationCode', async () => {
    expect(await Validation.confirmationCode.isValid(undefined)).toBeFalsy()
    expect(await Validation.confirmationCode.isValid('')).toBeFalsy()
    expect(await Validation.confirmationCode.isValid('1')).toBeFalsy()
    expect(await Validation.confirmationCode.isValid('12345')).toBeFalsy()
    expect(await Validation.confirmationCode.isValid('1234567')).toBeFalsy()
    expect(await Validation.confirmationCode.isValid('123456')).toBeTruthy()
    expect(await Validation.confirmationCode.isValid('12a456')).toBeFalsy()
    expect(await Validation.confirmationCode.cast(' trim ')).toBe('trim')
  })

  it('phone', async () => {
    expect(await Validation.phone.isValid(undefined)).toBeFalsy()
    expect(await Validation.phone.isValid('')).toBeFalsy()
    expect(await Validation.phone.isValid('1')).toBeFalsy()
    expect(await Validation.phone.isValid('12')).toBeFalsy()
    expect(await Validation.phone.isValid('123sfsdfds')).toBeFalsy()
    expect(await Validation.phone.isValid('123')).toBeTruthy()
    expect(await Validation.phone.isValid(join('', repeat('1', 50)))).toBeTruthy()
    expect(await Validation.phone.isValid(join('', repeat('1', 51)))).toBeFalsy()
    expect(await Validation.phone.isValid('123456789')).toBeTruthy()
    expect(await Validation.phone.cast(' trim ')).toBe('trim')
  })

  it('phoneOrEmail', async () => {
    expect(await Validation.phoneOrEmail.isValid(undefined)).toBeFalsy()
    expect(await Validation.phoneOrEmail.isValid('')).toBeFalsy()
    expect(await Validation.phoneOrEmail.isValid('1')).toBeFalsy()
    expect(await Validation.phoneOrEmail.isValid('12')).toBeFalsy()
    expect(await Validation.phoneOrEmail.isValid('123')).toBeTruthy()
    expect(await Validation.phoneOrEmail.isValid(join('', repeat('1', 50)))).toBeTruthy()
    expect(await Validation.phoneOrEmail.isValid(join('', repeat('1', 51)))).toBeFalsy()
    expect(await Validation.phoneOrEmail.isValid('123456789')).toBeTruthy()
    expect(await Validation.phoneOrEmail.cast(' trim ')).toBe('trim')
  })

  it('username', async () => {
    expect(await Validation.username.isValid(undefined)).toBeFalsy()
    expect(await Validation.username.isValid('')).toBeFalsy()
    expect(await Validation.username.isValid('1')).toBeFalsy()
    expect(await Validation.username.isValid('12')).toBeFalsy()
    expect(await Validation.username.isValid('123')).toBeTruthy()
    expect(await Validation.username.isValid(join('', repeat('a', 50)))).toBeTruthy()
    expect(await Validation.username.isValid(join('', repeat('a', 51)))).toBeFalsy()
    expect(await Validation.username.isValid('abc123')).toBeTruthy()
    expect(await Validation.username.isValid('abc123!@#$%')).toBeFalsy()
    expect(await Validation.username.cast(' trim ')).toBe('trim')
  })

  it('usernameStatusRequest', async () => {
    const username = 'username'
    await Validation.usernameStatusRequest(username)
    expect(API.graphql).toHaveBeenCalled()
    expect(API.graphqlOperation).toHaveBeenCalledWith(usersQueries.usernameStatus, { username })
  })

  describe('remoteUsernameValidation', () => {
    it('success', async () => {
      API.graphql.mockResolvedValue({ data: { usernameStatus: 'AVAILABLE' } })

      const value = 'value'
      const validate = Validation.remoteUsernameValidation()
      const results = await Promise.all(times(() => validate(value), 10))

      expect(results).toEqual([
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true,
      ])
      expect(API.graphql).toHaveBeenCalledTimes(2)
    })

    it('not available', async () => {
      API.graphql.mockResolvedValue({ data: { usernameStatus: 'NOT_AVAILABLE' } })

      const value = 'value'
      const validate = Validation.remoteUsernameValidation()
      const results = await Promise.all(times(() => validate(value), 10))

      expect(results).toEqual([
        false,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        false,
      ])
      expect(API.graphql).toHaveBeenCalledTimes(2)
    })

    it('not reject an error on failure request', async () => {
      API.graphql.mockRejectedValue(false)

      const value = 'value'
      const validate = Validation.remoteUsernameValidation()
      const results = await Promise.all(times(() => validate(value), 10))

      expect(results).toEqual([
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true,
      ])
      expect(API.graphql).toHaveBeenCalledTimes(2)
    })
  })

  it('getInputTypeProps', () => {
    expect(Validation.getInputTypeProps(undefined)).toEqual({})

    expect(Validation.getInputTypeProps('email')).toEqual({
      accessibilityLabel: 'email',
      keyboardType: 'email-address',
      textContentType: 'emailAddress',
      autoCompleteType: 'email',
    })

    expect(Validation.getInputTypeProps('confirmationCode')).toEqual({
      accessibilityLabel: 'confirmationCode',
      keyboardType: 'number-pad',
      textContentType: 'oneTimeCode',
      autoCompleteType: 'off',
      autoFocus: true,
      maxLength: 6,
    })

    expect(Validation.getInputTypeProps('password')).toEqual({
      accessibilityLabel: 'password',
      secureTextEntry: true,
      keyboardType: 'default',
      textContentType: 'password',
      autoCompleteType: 'password',
    })

    expect(Validation.getInputTypeProps('username')).toEqual({
      accessibilityLabel: 'username',
      keyboardType: 'default',
      textContentType: 'username',
      autoCompleteType: 'username',
    })
  })
})
