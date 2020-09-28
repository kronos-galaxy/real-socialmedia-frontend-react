import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import ActionsComponent from 'components/AuthHome/Actions'
import AuthActionTemplate from 'templates/Auth/Action'
import AuthHeaderTemplate from 'templates/Auth/Header'
import AuthTermsTemplate from 'templates/Auth/Terms'
import * as navigationActions from 'navigation/actions'

import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'
import testIDs from './test-ids'

const AuthHome = ({
  t,
  authSigninGoogle,
  authSigninGoogleRequest,
  authSigninApple,
  authSigninAppleRequest,
  authSigninAnonymous,
  authSigninAnonymousRequest,
}) => {
  const styling = styles
  const navigation = useNavigation()

  return (
    <View testID={testIDs.root} style={styling.root}>
      <View style={styling.component}>
        <AuthHeaderTemplate
          title={t('Sign up for REAL')}
          subtitle={t('The Healthier Social Media Movement')}
        />

        <View style={styling.content}>
          <ActionsComponent
            authSigninGoogle={authSigninGoogle}
            authSigninGoogleRequest={authSigninGoogleRequest}
            authSigninApple={authSigninApple}
            authSigninAppleRequest={authSigninAppleRequest}
            authSigninAnonymous={authSigninAnonymous}
            authSigninAnonymousRequest={authSigninAnonymousRequest}
          />
        </View>

        <AuthTermsTemplate />
      </View>

      <AuthActionTemplate testID={testIDs.footer.signInBtn} onPress={navigationActions.navigateSignin(navigation)}>
        {t('Already Have an Account ? Log In')}
      </AuthActionTemplate>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  component: {
    paddingHorizontal: 24,
    flex: 1,
  },
  content: {
    flex: 1,
  },
})

AuthHome.propTypes = {
  t: PropTypes.any,
  authSigninGoogle: PropTypes.any,
  authSigninGoogleRequest: PropTypes.any,
  authSigninApple: PropTypes.any,
  authSigninAppleRequest: PropTypes.any,
  authSigninAnonymous: PropTypes.any,
  authSigninAnonymousRequest: PropTypes.any,
}

export default withTranslation()(AuthHome)
