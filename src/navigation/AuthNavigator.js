import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { withTheme } from 'react-native-paper'

import { ThemesContext } from 'navigation/context'
import * as navigationOptions from 'navigation/options'

import AuthHomeScreen from 'screens/AuthHomeScreen'
import AuthSigninPhoneScreen from 'screens/AuthSigninPhoneScreen'
import AuthSigninEmailScreen from 'screens/AuthSigninEmailScreen'
import AuthUsernameScreen from 'screens/AuthUsernameScreen'
import AuthPhoneScreen from 'screens/AuthPhoneScreen'
import AuthPasswordScreen from 'screens/AuthPasswordScreen'
import AuthPhoneConfirmScreen from 'screens/AuthPhoneConfirmScreen'
import AuthEmailScreen from 'screens/AuthEmailScreen'
import AuthEmailConfirmScreen from 'screens/AuthEmailConfirmScreen'
import AuthPhotoScreen from 'screens/AuthPhotoScreen'
import AuthPhotoUploadScreen from 'screens/AuthPhotoUploadScreen'
import VerificationScreen from 'screens/VerificationScreen'
import CameraScreen from 'screens/CameraScreen'
import AuthForgotPhoneScreen from 'screens/AuthForgotPhoneScreen'
import AuthForgotEmailScreen from 'screens/AuthForgotEmailScreen'
import AuthForgotConfirmScreen from 'screens/AuthForgotConfirmScreen'
import AuthCognitoScreen from 'screens/AuthCognitoScreen'

const SignupNavigator = () => {
  const Tab = createMaterialTopTabNavigator()
  const { theme, themes } = useContext(ThemesContext)
  const tabNavigatorAuthProps = navigationOptions.tabNavigatorAuthProps({ theme })
  return (
    <Tab.Navigator {...tabNavigatorAuthProps}>
      <Tab.Screen
        name="AuthPhone"
        component={AuthPhoneScreen}
        options={{
          tabBarLabel: 'Phone',
          tabBarTestID: 'navigation/AuthNavigator/Signup/phone',
        }}
      />
      <Tab.Screen
        name="AuthEmail"
        component={AuthEmailScreen}
        options={{
          tabBarLabel: 'Email',
          tabBarTestID: 'navigation/AuthNavigator/Signup/email',
        }}
      />
    </Tab.Navigator>
  )
}

const SigninNavigator = () => {
  const Tab = createMaterialTopTabNavigator()
  const { theme, themes } = useContext(ThemesContext)
  const tabNavigatorAuthProps = navigationOptions.tabNavigatorAuthProps({ theme })
  return (
    <Tab.Navigator {...tabNavigatorAuthProps}>
      <Tab.Screen
        name="AuthSigninPhone"
        component={AuthSigninPhoneScreen}
        options={{
          tabBarLabel: 'Phone',
          tabBarTestID: 'navigation/AuthNavigator/Signin/phone',
        }}
      />
      <Tab.Screen
        name="AuthSigninEmail"
        component={AuthSigninEmailScreen}
        options={{
          tabBarLabel: 'Email',
          tabBarTestID: 'navigation/AuthNavigator/Signin/email',
        }}
      />
    </Tab.Navigator>
  )
}

const ForgotNavigator = () => {
  const Tab = createMaterialTopTabNavigator()
  const { theme, themes } = useContext(ThemesContext)
  const tabNavigatorAuthProps = navigationOptions.tabNavigatorAuthProps({ theme })
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

const AuthNavigator = ({ theme }) => {
  const Stack = createStackNavigator()

  const stackScreenOnboardProps = navigationOptions.stackScreenOnboardProps({ theme })
  const stackScreenBlankProps = navigationOptions.stackScreenBlankProps({ theme })
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme })
  const stackScreenAuthProps = navigationOptions.stackScreenAuthProps({ theme })
  const stackScreenAuthModalProps = navigationOptions.stackScreenAuthModalProps({ theme })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="AuthHome"
        component={AuthHomeScreen}
        {...stackScreenOnboardProps}
      />

      <Stack.Screen
        name="Signup"
        component={SignupNavigator}
        {...stackScreenAuthProps({ options: { title: 'Signup', headerLeft: navigationOptions.pageHeaderLeft, gestureEnabled: true, } })}
      />

      <Stack.Screen
        name="Signin"
        component={SigninNavigator}
        {...stackScreenAuthProps({ options: { title: 'Log In', headerLeft: navigationOptions.pageHeaderLeft, gestureEnabled: true, } })}
      />

      <Stack.Screen
        name="Forgot"
        component={ForgotNavigator}
        {...stackScreenAuthProps({ options: { title: 'Forgot', headerLeft: navigationOptions.pageHeaderLeft, gestureEnabled: true, } })}
      />

      <Stack.Screen
        name="AuthUsername"
        component={AuthUsernameScreen}
        {...stackScreenAuthProps({ options: { title: 'Signup', headerLeft: navigationOptions.pageHeaderLeft, gestureEnabled: true, } })}
      />

      <Stack.Screen
        name="AuthPassword"
        component={AuthPasswordScreen}
        {...stackScreenAuthProps({ options: { title: 'Signup', headerLeft: navigationOptions.pageHeaderLeft, gestureEnabled: true, } })}
      />

      <Stack.Screen
        name="AuthEmailConfirm"
        component={AuthEmailConfirmScreen}
        {...stackScreenAuthProps({ options: { title: 'Enter 6-digit code', headerLeft: navigationOptions.pageHeaderLeft, gestureEnabled: true, } })}
      />

      <Stack.Screen
        name="AuthPhoneConfirm"
        component={AuthPhoneConfirmScreen}
        {...stackScreenAuthProps({ options: { title: 'Enter 6-digit code', headerLeft: navigationOptions.pageHeaderLeft, gestureEnabled: true, } })}
      />

      <Stack.Screen
        name="AuthPhotoUpload"
        component={AuthPhotoUploadScreen}
        {...stackScreenAuthProps({ options: { title: 'Welcome', headerLeft: null, } })}
      />

      <Stack.Screen
        name="AuthPhoto"
        component={AuthPhotoScreen}
        {...stackScreenAuthProps({ options: { title: 'Welcome', headerLeft: null, } })}
      />

      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
        {...stackScreenAuthModalProps}
      />

      <Stack.Screen
        name="AuthCamera"
        component={CameraScreen}
        {...stackScreenBlankProps}
      />

      <Stack.Screen
        name="AuthForgotConfirm"
        component={AuthForgotConfirmScreen}
        {...stackScreenAuthProps({ options: { title: 'Forgot Confirm', headerLeft: navigationOptions.pageHeaderLeft, gestureEnabled: true, } })}
      />

      <Stack.Screen
        name="AuthCognito"
        component={AuthCognitoScreen}
        {...stackScreenAuthProps({ options: { title: 'Signup', headerLeft: null } })}
      />
    </Stack.Navigator>
  )
}

export default withTheme(AuthNavigator)