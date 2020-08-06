import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { Text } from 'react-native-paper'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Verification = ({
  t,
  theme,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  
  return (
    <BlurView style={styling.root}>
      <TouchableOpacity onPress={navigationActions.navigateVerification(navigation, { actionType: 'BACK' })}>
        <Text style={styling.text}>{t('Failed Verification, tap to learn more.')}</Text>
      </TouchableOpacity>
    </BlurView>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    zIndex: 1,
  },
  blur: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'red',
    width: '100%',
    height: '100%',
  },
})

Verification.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
}

export default withTranslation()(withTheme(Verification))
