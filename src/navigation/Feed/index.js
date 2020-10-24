import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { AuthContext } from 'services/providers/Auth'
import { ThemeContext } from 'services/providers/Theme'
import * as navigationOptions from 'navigation/options'
import * as navigationFragments from 'navigation/fragments'

import FeedScreen from 'screens/FeedScreen'

const Stack = createStackNavigator()

const FeedNavigator = () => {
  const { theme, themes } = useContext(ThemeContext)
  const { user } = useContext(AuthContext)
  const stackNavigatorCardProps = navigationOptions.stackNavigatorCardProps({ theme, themes })
  const stackScreenDefaultProps = navigationOptions.stackScreenDefaultProps({ theme, themes, user })
  const stackScreenPageProps = navigationOptions.stackScreenPageProps({ theme, themes })

  return (
    <Stack.Navigator {...stackNavigatorCardProps}>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        {...stackScreenDefaultProps}
      />
      
      {navigationFragments.media({
        Stack,
        stackScreenPageProps,
      })}
    </Stack.Navigator>
  )
}

export default FeedNavigator