import { createStackNavigator } from 'react-navigation-stack'
import AuthScreen from 'screens/AuthScreen'
import AuthForgotScreen from 'screens/AuthForgotScreen'
import AuthForgotConfirmScreen from 'screens/AuthForgotConfirmScreen'
import AuthSignupScreen from 'screens/AuthSignupScreen'
import AuthSignupConfirmScreen from 'screens/AuthSignupConfirmScreen'
import AuthOnboardScreen from 'screens/AuthOnboardScreen'

/**
 *
 */
const AuthStack = (screenProps) => createStackNavigator({
  Auth: AuthScreen,
  AuthForgot: AuthForgotScreen,
  AuthForgotConfirm: AuthForgotConfirmScreen,
  AuthSignup: AuthSignupScreen,
  AuthSignupConfirm: AuthSignupConfirmScreen,
  AuthOnboard: AuthOnboardScreen,
}, {
  cardStyle: {
    backgroundColor: screenProps.theme.colors.backgroundPrimary,
  },
  defaultNavigationOptions: {
    gesturesEnabled: false,
    gestureResponseDistance: {
      horizontal: 125,
    },
  },
})

export default AuthStack