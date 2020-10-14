import Config from 'react-native-config'
import * as Yup from 'yup'
import debounce from 'debounce-async'

export const usernameStatusRequest = (value) => {
  const url = `${Config.AWS_API_GATEWAY_ENDPOINT}/username/status?username=${value}`
  const options = {
    method: 'GET',
    headers: {
      'X-Api-Key': Config.AWS_API_GATEWAY_KEY,
    },
  }

  return fetch(url, options).then((resp) => resp.json())
}

export const remoteUsernameValidation = () => {
  function validate(value) {
    return new Promise((resolve) => {
      usernameStatusRequest(value)
        .then((resp) => resolve(resp.status === 'AVAILABLE'))
        .catch(() => resolve(true))
    })
  }

  const debouncedValidation = debounce(validate, 300, { leading: true })
  const ignoreError = () => {}

  return function (value) {
    return debouncedValidation(value).catch(ignoreError)
  }
}

export const username = Yup.string()
  .min(3)
  .max(50)
  .matches(/^[a-zA-Z0-9_.]*$/, 'username must only contain letters & numbers')
  .trim()
  .required()
  .test('usernameReserve', 'username is reserved', remoteUsernameValidation())
