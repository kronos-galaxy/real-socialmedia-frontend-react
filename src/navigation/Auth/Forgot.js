import React, { useContext } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { ThemeContext } from 'services/providers/Theme'
import * as navigationOptions from 'navigation/options'
import AuthForgotPhoneScreen from 'screens/AuthForgotPhoneScreen'
import AuthForgotEmailScreen from 'screens/AuthForgotEmailScreen'

const ForgotNavigator = () => {
  const { theme, themes } = useContext(ThemeContext)
  const Tab = createMaterialTopTabNavigator()
  const tabNavigatorAuthProps = navigationOptions.tabNavigatorAuthProps({ theme, themes })

  return (
    <Tab.Navigator {...tabNavigatorAuthProps}>
      <Tab.Screen
        name="AuthForgotPhone"
        component={AuthForgotPhoneScreen}
        options={{
          tabBarLabel: 'Phone',
          tabBarTestID: 'navigation/AuthNavigator/Forgot/phone',
        }}
      />
      <Tab.Screen
        name="AuthForgotEmail"
        component={AuthForgotEmailScreen}
        options={{
          tabBarLabel: 'Email',
          tabBarTestID: 'navigation/AuthNavigator/Forgot/email',
        }}
      />
    </Tab.Navigator>
  )
}

export default ForgotNavigator