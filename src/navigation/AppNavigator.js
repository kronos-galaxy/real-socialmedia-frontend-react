import React from 'react'
import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation'
import AuthNavigator from 'navigation/AuthNavigator'
import MainNavigator from 'navigation/MainNavigator'
import LoadingScreen from 'screens/LoadingScreen'
import AuthOnboardScreen from 'screens/AuthOnboardScreen'
import AvatarPickerScreen from 'screens/AvatarPickerScreen'

export default ({ initialRouteName, ...props }) => {
  const AppContainer = createAppContainer(
    createSwitchNavigator({
      Loading: LoadingScreen,
      AuthOnboard: AuthOnboardScreen,
      AvatarPicker: AvatarPickerScreen,
      Auth: AuthNavigator(props.screenProps),
      Main: MainNavigator(props.screenProps),
    }, { initialRouteName }),
  )

  return (
    <AppContainer
      uriPrefix="real.app://"
      {...props}
    />
  )
}