import React, { useState, useRef, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from 'services/providers/Auth'
import { AppProvider } from 'services/providers/App'
import { Provider as PaperProvider } from 'react-native-paper'
import { ThemesContext } from 'navigation/context'
import { ReduxNetworkProvider } from 'react-native-offline'
import initializeStore from 'store/index'
import codePush from 'react-native-code-push' 
import NetworkComponent from 'components/Network'
import PinchZoomComponent from 'components/Feed/PinchZoom'
import FeedContextComponent from 'components/Feed/Context'
import Config from 'react-native-config' 
import LoadingComponent from 'components/Loading'
import linking from 'navigation/linking'
import Router from 'navigation/Router'

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  deploymentKey: Config.CODE_PUSH_DEPLOYMENT_KEY,
}

// codePush.sync(codePushOptions)

const Application = (navigationProps) => {
  const [draggedImage, setDraggedImage] = useState({})
  const { store, persistor } = initializeStore({ navigationRef: navigationProps.navigationRef })

  return (
    <Provider store={store}>
      <ReduxNetworkProvider>
        <PersistGate loading={(<LoadingComponent />)} persistor={persistor}>
          <AppProvider {...navigationProps}>
            {({ theme, themes, networkIsConnected }) => (
              <PaperProvider theme={theme}>
              <ThemesContext.Provider value={{ theme, themes }}>
                <FeedContextComponent.Provider value={{ draggedImage, setDraggedImage }}>
                  <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
                  <PinchZoomComponent />
                  <NetworkComponent networkIsConnected={networkIsConnected} />

                  <AuthProvider>
                    <Router navigationRef={navigationProps.navigationRef} />
                  </AuthProvider>
                </FeedContextComponent.Provider>
              </ThemesContext.Provider>
              </PaperProvider>
            )}
          </AppProvider>
        </PersistGate>
      </ReduxNetworkProvider>
    </Provider>
  )
}

const WithNavigationContainer = () => {
  const navigationRef = useRef(null)
  const onStateChangeRef = useRef(null)
  const routeNameRef = useRef(null)

  const [navigationReady, setNavigationReady] = useState(false)
  const setMounted = () => setNavigationReady(true)
  const setUnmounted = () => setNavigationReady(false)
  const onStateChange = () => onStateChangeRef.current && onStateChangeRef.current()
  useEffect(() => setUnmounted, [])

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={setMounted}
      onStateChange={onStateChange}
      linking={linking}
    >
      {navigationReady ?
        <Application
          navigationRef={navigationRef}
          onStateChangeRef={onStateChangeRef}
          routeNameRef={routeNameRef}
        />
      : null}
    </NavigationContainer>
  )
}

export default codePush(codePushOptions)(WithNavigationContainer)