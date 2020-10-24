import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import { AuthContext } from 'services/providers/Auth'
import { ThemeContext } from 'services/providers/Theme'
import * as navigationOptions from 'navigation/options'
import * as navigationFragments from 'navigation/fragments'

import DatingScreen from 'screens/DatingScreen'
import DatingAboutScreen from 'screens/DatingAboutScreen'
import DatingMatchScreen from 'screens/DatingMatchScreen'
import DatingPreviewScreen from 'screens/DatingPreviewScreen'
import DatingProfileScreen from 'screens/DatingProfileScreen'

const Stack = createStackNavigator()

const DatingNavigator = () => {
  const { theme, themes } = useContext(ThemeContext)
  const { user } = useContext(AuthContext)
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme, themes })
  const stackScreenDefaultProps = navigationOptions.stackScreenDefaultProps({ theme, themes, user })
  const stackScreenPageProps = navigationOptions.stackScreenPageProps({ theme, themes })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="Dating"
        component={DatingScreen}
        {...stackScreenDefaultProps}
      />

      <Stack.Screen
        name="DatingAbout"
        component={DatingAboutScreen}
        {...stackScreenDefaultProps}
      />

      <Stack.Screen
        name="DatingMatch"
        component={DatingMatchScreen}
        {...stackScreenDefaultProps}
      />

      <Stack.Screen
        name="DatingPreview"
        component={DatingPreviewScreen}
        {...stackScreenDefaultProps}
      />

      <Stack.Screen
        name="DatingProfile"
        component={DatingProfileScreen}
        {...stackScreenDefaultProps}
      />

      {navigationFragments.media({
        Stack,
        stackScreenPageProps,
      })}
    </Stack.Navigator>
  )
}

export default withTheme(DatingNavigator)