import * as Validation from 'services/Validation'
import { repeat, join, times } from 'ramda'

jest.mock('react-native-config', () => ({
  AWS_API_GATEWAY_ENDPOINT: 'AWS_API_GATEWAY_ENDPOINT',
  AWS_API_GATEWAY_KEY: 'AWS_API_GATEWAY_KEY',
}))

global.fetch = jest.fn().mockResolvedValue(true)

describe('Validation service', () => {
  afterEach(() => {
    global.fetch.mockClear()
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
    const value = 'value'
    const response = { json: jest.fn() }
    global.fetch.mockResolvedValueOnce(response)

    await Validation.usernameStatusRequest(value)
    expect(global.fetch).toHaveBeenCalledWith('AWS_API_GATEWAY_ENDPOINT/username/status?username=value', {
      headers: { 'X-Api-Key': 'AWS_API_GATEWAY_KEY' },
      method: 'GET',
    })
    expect(response.json).toHaveBeenCalled()
  })

  describe('remoteUsernameValidation', () => {
    it('success', async () => {
      global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue({ status: 'AVAILABLE' }) })

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
      expect(global.fetch).toHaveBeenCalledTimes(2)
    })

    it('not available', async () => {
      global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue({ status: 'NOT_AVAILABLE' }) })

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
      expect(global.fetch).toHaveBeenCalledTimes(2)
    })

    it('not reject an error on failure request', async () => {
      global.fetch.mockRejectedValue(false)

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
      expect(global.fetch).toHaveBeenCalledTimes(2)
    })
  })
})
