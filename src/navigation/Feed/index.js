import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import { ThemesContext } from 'navigation/context'
import * as navigationOptions from 'navigation/options'
import * as navigationFragments from 'navigation/fragments'

import FeedScreen from 'screens/FeedScreen'
import AlbumsScreen from 'screens/AlbumsScreen'
import AlbumCreateScreen from 'screens/AlbumCreateScreen'
import ProfileRequestsScreen from 'screens/ProfileRequestsScreen'


const AppNavigator = () => {
  const { theme, themes } = useContext(ThemesContext)
  const Stack = createStackNavigator()
  const stackNavigatorCardProps = navigationOptions.stackNavigatorCardProps({ theme, themes })
  const stackScreenDefaultProps = navigationOptions.stackScreenDefaultProps({ theme, themes })
  const stackScreenCardProps = navigationOptions.stackScreenCardProps({ theme, themes })
  const stackScreenPageProps = navigationOptions.stackScreenPageProps({ theme, themes })

  return (
    <Stack.Navigator {...stackNavigatorCardProps}>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        {...stackScreenDefaultProps}
      />

      <Stack.Screen
        name="Albums"
        component={AlbumsScreen}
        {...stackScreenPageProps({ options: { title: 'Albums' } })}
      />

      <Stack.Screen
        name="AlbumCreate"
        component={AlbumCreateScreen}
        {...stackScreenPageProps({ options: { title: 'Create Album' } })}
      />

      <Stack.Screen
        name="ProfileRequests"
        component={ProfileRequestsScreen}
        {...stackScreenPageProps({ options: { title: 'Friend Requests' } })}
      />
      
      {navigationFragments.media({
        Stack,
        stackScreenCardProps,
        stackScreenPageProps,
      })}
    </Stack.Navigator>
  )
}

export default withTheme(AppNavigator)