/* eslint react/prop-types: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react-native'
import { ThemeContext } from 'services/providers/Theme'
import { Provider as PaperProvider } from 'react-native-paper'
import theme from 'tests/mocks/theme.mock'
import rootReducer from 'store/reducers'

/**
 * renderWithProviders
 */
const AllTheProviders = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  )
}

AllTheProviders.propTypes = {
  children: PropTypes.element.isRequired,
}

export const renderWithProviders = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

/**
 * renderWithStore
 */
const createStoreWrapper = (store) => ({ children }) => (
  <Provider store={store}>
    <ThemeContext.Provider value={{ theme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  </Provider>
)

export const renderWithStore = (ui, actions = []) => {
  const store = createStore(rootReducer)
  actions.forEach(store.dispatch)

  const holder = render(ui, { wrapper: createStoreWrapper(store) })
  return { ...holder, store }
}
