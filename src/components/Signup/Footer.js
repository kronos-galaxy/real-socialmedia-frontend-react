import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Footer = ({
  theme,
  navigation,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const handleSignupPress = () => navigation.navigate('Auth')

  return (
    <View style={styling.root}>
      <View style={styling.option}>
        <TouchableOpacity onPress={handleSignupPress}>
          <Text style={styling.optionText}>{t('Already have an account')}? {t('Sign In')}.</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  option: {
    alignItems: 'center',
  },
  optionText: {
    color: '#3897f0',
  },
})

Footer.propTypes = {
  theme: PropTypes.any,
  navigation: PropTypes.any,
}

export default withNavigation(
  withTheme(Footer)
)
