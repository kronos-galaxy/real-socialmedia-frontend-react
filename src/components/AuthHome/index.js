import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import ActionsComponent from 'components/AuthHome/Actions'
import AuthActionTemplate from 'templates/Auth/Action'
import AuthHeaderTemplate from 'templates/Auth/Header'
import AuthTermsTemplate from 'templates/Auth/Terms'
import * as navigationActions from 'navigation/actions'
import CloseIcon from 'assets/svg/action/Close'

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
      <TouchableOpacity
        testID={testIDs.closeBtn}
        style={[styling.closeBtn, authSigninAnonymous.status === 'loading' ? styling.disabled : null]}
        onPress={authSigninAnonymousRequest}
        disabled={authSigninAnonymous.status === 'loading'}
      >
        <CloseIcon />
      </TouchableOpacity>
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
  closeBtn: {
    position: 'absolute',
    top: 10,
    left: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
    zIndex: 1,
  },
  disabled: {
    opacity: 0.4,
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
