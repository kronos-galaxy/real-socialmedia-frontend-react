import React from 'react'
import AuthNavigator from 'navigation/AuthNavigator'
import AppNavigator from 'navigation/AppNavigator'
import * as navigationOptions from 'navigation/options'
import { createStackNavigator } from '@react-navigation/stack'
import LoadingComponent from 'components/Loading'

const Router = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Loading"
        component={LoadingComponent}
        {...navigationOptions.stackScreenModalStaticProps}
      />
      <Stack.Screen
        name="App"
        component={AppNavigator}
        {...navigationOptions.stackScreenModalStaticProps}
      />
      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
        {...navigationOptions.stackScreenModalStaticProps}
      />
    </Stack.Navigator>
  )
}

Router.propTypes = {
}

export default Router
