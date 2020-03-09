import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { withTheme } from 'react-native-paper'

import { ThemesContext } from 'navigation/context'
import * as navigationOptions from 'navigation/options'

import TabNavigator from 'navigation/TabNavigator'
import StoryScreen from 'screens/StoryScreen'
import PostTypeScreen from 'screens/PostTypeScreen'
import CommentsScreen from 'screens/CommentsScreen'
import PostEditScreen from 'screens/PostEditScreen'
import PostCreateScreen from 'screens/PostCreateScreen'
import CameraScreen from 'screens/CameraScreen'
import ChatScreen from 'screens/ChatScreen'

const ChatNavigator = withTheme(({ theme }) => {
  const Stack = createStackNavigator()
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme })
  const stackScreenDefaultProps = navigationOptions.stackScreenDefaultProps({ theme })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        {...stackScreenDefaultProps}
      />
    </Stack.Navigator>
  )
})

const RootNavigator = () => {
  const Stack = createStackNavigator()
  const { theme, themes } = useContext(ThemesContext)
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme, themes })
  const stackScreenBlankProps = navigationOptions.stackScreenBlankProps({ theme, themes })
  const stackScreenModalProps = navigationOptions.stackScreenModalProps({ theme, themes })
  const stackScreenPageProps = navigationOptions.stackScreenPageProps({ theme, themes })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        {...stackScreenBlankProps}
      />

      <Stack.Screen
        name="PostType"
        component={PostTypeScreen}
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

      <Stack.Screen
        name="PostCreate"
        component={PostCreateScreen}
        {...stackScreenPageProps({ options: { title: 'New Post' } })}
      />

      <Stack.Screen
        name="PostEdit"
        component={PostEditScreen}
        {...stackScreenPageProps({ options: { title: 'Edit Post' } })}
      />
    </Stack.Navigator>
  )
}


const AppNavigator = withTheme(({ theme }) => {
  const Tab = createMaterialTopTabNavigator()

  const tabNavigatorProps = {
    initialRouteName: 'Root',
    tabBar: () => null,
    lazy: true,
    sceneContainerStyle: {
      backgroundColor: 'transparent',
    },
  }

  return (
    <Tab.Navigator {...tabNavigatorProps}>
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