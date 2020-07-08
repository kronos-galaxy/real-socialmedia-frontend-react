import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Actions = ({
  t,
  theme,
  authGoogle,
  authGoogleRequest,
  authApple,
  authAppleRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  
  return (
    <View style={styling.root}>
      <View style={styling.item}>
        <DefaultButton testID="components/AuthHome/Actions/signin" label={t('Use Phone or Email')} onPress={navigationActions.navigateAuthUsername(navigation)} loading={false} />
      </View>
      <View style={styling.item}>
        <DefaultButton testID="components/AuthHome/Actions/apple" label={t('Login with Apple')} onPress={authAppleRequest} loading={authApple.status === 'loading'} />
      </View>
      <View style={styling.item}>
        <DefaultButton testID="components/AuthHome/Actions/google" label={t('Login with Google')} onPress={authGoogleRequest} loading={authGoogle.status === 'loading'} />
      </View>
    </View>
  )
}

Actions.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  authGoogle: PropTypes.any,
  authGoogleRequest: PropTypes.any,
  authApple: PropTypes.any,
  authAppleRequest: PropTypes.any,
}

const styles = theme => StyleSheet.create({
  root: {
  },
  item: {
    marginBottom: 12,
  },
})

export default withTranslation()(withTheme(Actions))
