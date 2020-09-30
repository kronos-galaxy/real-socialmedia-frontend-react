import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import { ThemeContext } from 'services/providers/Theme'
import * as navigationOptions from 'navigation/options'
import * as navigationFragments from 'navigation/fragments'

import SearchScreen from 'screens/SearchScreen'

const SearchNavigator = () => {
  const Stack = createStackNavigator()
  const { theme, themes } = useContext(ThemeContext)
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme, themes })
  const stackScreenDefaultProps = navigationOptions.stackScreenDefaultProps({ theme, themes })
  const stackScreenPageProps = navigationOptions.stackScreenPageProps({ theme, themes })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        {...stackScreenDefaultProps}
      />

      {navigationFragments.media({
        Stack,
        stackScreenPageProps,
      })}
    </Stack.Navigator>
  )
}

export default withTheme(SearchNavigator)