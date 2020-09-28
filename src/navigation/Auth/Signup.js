import React, { useContext } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { ThemesContext } from 'navigation/context'
import * as navigationOptions from 'navigation/options'
import AuthPhoneScreen from 'screens/AuthPhoneScreen'
import AuthEmailScreen from 'screens/AuthEmailScreen'
import testIDs from '../test-ids'

const SignupNavigator = () => {
  const { theme, themes } = useContext(ThemesContext)
  const Tab = createMaterialTopTabNavigator()
  const tabNavigatorAuthProps = navigationOptions.tabNavigatorAuthProps({ theme, themes })

  return (
    <Tab.Navigator {...tabNavigatorAuthProps}>
      <Tab.Screen
        name="AuthPhone"
        component={AuthPhoneScreen}
        options={{
          tabBarLabel: 'Phone',
          tabBarTestID: testIDs.authNavigator.signUp.phone,
        }}
      />
      <Tab.Screen
        name="AuthEmail"
        component={AuthEmailScreen}
        options={{
          tabBarLabel: 'Email',
          tabBarTestID: testIDs.authNavigator.signUp.email,
        }}
      />
    </Tab.Navigator>
  )
}

export default SignupNavigator