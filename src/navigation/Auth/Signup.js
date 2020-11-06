import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { ThemeContext } from 'services/providers/Theme'
import * as navigationOptions from 'navigation/options'
import AuthPhoneScreen from 'screens/AuthPhoneScreen'
import AuthEmailScreen from 'screens/AuthEmailScreen'
import * as signupActions from 'store/ducks/signup/actions'

import testIDs from '../test-ids'

const Tab = createMaterialTopTabNavigator()

const SignupNavigator = () => {
  const dispatch = useDispatch()
  const { theme } = useContext(ThemeContext)
  const tabNavigatorAuthProps = navigationOptions.tabNavigatorAuthProps({ theme })

  const onUnmount = () => {
    dispatch(signupActions.signupEmailIdle())
    dispatch(signupActions.signupPhoneIdle())
    dispatch(signupActions.signupCreateIdle())
  }

  useEffect(() => onUnmount, [])

  return (
    <Tab.Navigator {...tabNavigatorAuthProps} >
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