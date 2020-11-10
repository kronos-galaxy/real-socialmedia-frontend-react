import React, { useState, useRef, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from 'services/providers/Auth'
import { AppProvider } from 'services/providers/App'
import { ThemeProvider } from 'services/providers/Theme'
import { ReduxNetworkProvider } from 'react-native-offline'
import initializeStore from 'store/index'
import codePush from 'react-native-code-push' 
import Config from 'react-native-config' 
import linking from 'navigation/linking'
import Router from 'navigation/Router'

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  deploymentKey: Config.CODE_PUSH_DEPLOYMENT_KEY,
}

// codePush.sync(codePushOptions)

const Application = ({ navigationRef }) => {
  const { store, persistor } = useMemo(() => initializeStore({ navigationRef }), [])

  return (
    <Provider store={store}>
      <ReduxNetworkProvider>
        <PersistGate persistor={persistor}>
          <AppProvider>
            <AuthProvider>
              <ThemeProvider>
                <Router />
              </ThemeProvider>
            </AuthProvider>
          </AppProvider>
        </PersistGate>
      </ReduxNetworkProvider>
    </Provider>
  )
}

Application.propTypes = {
  navigationRef: PropTypes.any,
}

const WithNavigationContainer = () => {
  const navigationRef = useRef(null)
  const [navigationReady, setNavigationReady] = useState(false)
  const setMounted = () => setNavigationReady(true)
  const setUnmounted = () => setNavigationReady(false)

  useEffect(() => setUnmounted, [])

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={setMounted}
      linking={linking}
    >
      {navigationReady ?
        <Application 
          navigationRef={navigationRef} 
        />
      : null}
    </NavigationContainer>
  )
}

export default codePush(codePushOptions)(WithNavigationContainer)