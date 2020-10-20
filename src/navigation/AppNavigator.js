import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { withTheme } from 'react-native-paper'

import { AuthContext } from 'services/providers/Auth'
import { ThemeContext } from 'services/providers/Theme'
import * as navigationOptions from 'navigation/options'
import * as navigationFragments from 'navigation/fragments'

import TabNavigator from 'navigation/TabNavigator'
import StoryScreen from 'screens/StoryScreen'
import PostTypeScreen from 'screens/PostTypeScreen'
import CommentsScreen from 'screens/CommentsScreen'
import CameraScreen from 'screens/CameraScreen'
import ChatScreen from 'screens/ChatScreen'
import ChatDirectScreen from 'screens/ChatDirectScreen'
import ChatOptionsScreen from 'screens/ChatOptionsScreen'
import ProfileScreen from 'screens/ProfileScreen'
import ProfileRequestsScreen from 'screens/ProfileRequestsScreen'
import VerificationScreen from 'screens/VerificationScreen'
import ProfileUpgradeScreen from 'screens/ProfileUpgradeScreen'

const ChatNavigator = ({ navigation }) => {
  const { theme, themes } = useContext(ThemeContext)
  const Stack = createStackNavigator()
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme })
  const stackScreenPageProps = navigationOptions.stackScreenPageProps({ theme, themes })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        {...stackScreenPageProps({ options: { title: 'Chat', headerLeft: navigationOptions.chatHeaderLeft({ navigation, theme }) } })}
      />
      <Stack.Screen
        name="ChatDirect"
        component={ChatDirectScreen}
        {...stackScreenPageProps({ options: { title: 'Chat' } })}
      />
      <Stack.Screen
        name="ChatOptions"
        component={ChatOptionsScreen}
        {...stackScreenPageProps({ options: { title: 'Chat' } })}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        {...stackScreenPageProps({ options: { title: 'Comments' } })}
      />
      <Stack.Screen
        name="ProfileRequests"
        component={ProfileRequestsScreen}
        {...stackScreenPageProps({ options: { title: 'Follower Requests' } })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        {...stackScreenPageProps({ options: { title: 'Profile' } })}
      />
    </Stack.Navigator>
  )
}

ChatNavigator.propTypes = {
  navigation: PropTypes.any,
}

const RootNavigator = () => {
  const Stack = createStackNavigator()
  const { theme, themes } = useContext(ThemeContext)
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme, themes })
  const stackScreenBlankProps = navigationOptions.stackScreenBlankProps({ theme, themes })
  const stackScreenPageProps = navigationOptions.stackScreenPageProps({ theme, themes })
  const stackScreenCardProps = navigationOptions.stackScreenCardProps({ theme, themes })
  const stackScreenModalProps = navigationOptions.stackScreenModalProps

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        {...stackScreenBlankProps}
      />

      <Stack.Screen
        name="ProfileUpgrade"
        component={ProfileUpgradeScreen}
        {...stackScreenModalProps}
      />

      <Stack.Screen
        name="PostType"
        component={PostTypeScreen}
        {...stackScreenModalProps}
      />

      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
        {...stackScreenModalProps}
      />

      <Stack.Screen
        name="Story"
        component={StoryScreen}
        {...stackScreenModalProps}
      />

      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        {...stackScreenPageProps({ options: { title: 'Comments' } })}
      />

      {navigationFragments.media({
        Stack,
        stackScreenCardProps,
        stackScreenPageProps,
      })}
    </Stack.Navigator>
  )
}

const AppNavigator = withTheme(() => {
  const Tab = createMaterialTopTabNavigator()
  const { isUserActive } = useContext(AuthContext)
  const tabNavigatorDefaultProps = navigationOptions.tabNavigatorDefaultProps({isUserActive})

  return (
    <Tab.Navigator {...tabNavigatorDefaultProps}>
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
      />
      <Tab.Screen
        name="Root"
        component={RootNavigator}
      />
      <Tab.Screen
        name="Chat"
        component={ChatNavigator}
      />
    </Tab.Navigator>
  )
})

export default AppNavigator