import { navigateToPath, createPath } from 'navigation/helpers'

const params = { a: 1, b: 2 }

describe('Navigation helpers', () => {
  it('createPath', () => {
    expect(createPath()).toEqual({ screen: undefined, params: {} })
    expect(createPath(['a'])).toEqual({ screen: 'a', params: {} })
    expect(createPath(['a', 'b', 'c'])).toEqual({
      screen: 'a',
      params: {
        screen: 'b',
        params: {
          screen: 'c',
          params: {},
        },
      },
    })
    expect(createPath(['a', 'b', 'c'], params)).toEqual({
      screen: 'a',
      params: {
        screen: 'b',
        params: {
          screen: 'c',
          params,
        },
      },
    })
  })

  it('navigateToPath', () => {
    const navigation = { navigate: jest.fn() }

    const testNavigate = ({ path, params, expected }) => {
      navigateToPath(path)(navigation, params)
      expect(navigation.navigate).toHaveBeenCalledWith(...expected)
      navigation.navigate.mockClear()
    }

    testNavigate({ path: undefined, params: undefined, expected: ['', {}] })
    testNavigate({ path: '', params: {}, expected: ['', {}] })
    testNavigate({ path: 'a.b', params, expected: ['a', { screen: 'b', params }] })
    testNavigate({ path: 'a.b.c', params, expected: ['a', { screen: 'b', params: { screen: 'c', params } }] })
  })
})
