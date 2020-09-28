import React, { useContext } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { ThemesContext } from 'navigation/context'
import * as navigationOptions from 'navigation/options'
import AuthSigninPhoneScreen from 'screens/AuthSigninPhoneScreen'
import AuthSigninEmailScreen from 'screens/AuthSigninEmailScreen'
import testIDs from '../test-ids'

const SigninNavigator = () => {
  const { theme, themes } = useContext(ThemesContext)
  const Tab = createMaterialTopTabNavigator()
  const tabNavigatorAuthProps = navigationOptions.tabNavigatorAuthProps({ theme, themes })

  return (
    <Tab.Navigator {...tabNavigatorAuthProps}>
      <Tab.Screen
        name="AuthSigninPhone"
        component={AuthSigninPhoneScreen}
        options={{
          tabBarLabel: 'Phone',
          tabBarTestID: testIDs.authNavigator.signIn.phone,
        }}
      />
      <Tab.Screen
        name="AuthSigninEmail"
        component={AuthSigninEmailScreen}
        options={{
          tabBarLabel: 'Email',
          tabBarTestID: testIDs.authNavigator.signIn.email,
        }}
      />
    </Tab.Navigator>
  )
}

export default SigninNavigator