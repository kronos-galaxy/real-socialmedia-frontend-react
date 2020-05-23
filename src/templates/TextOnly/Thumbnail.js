import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const TextOnlyComponent = ({
  t,
  theme,
  text,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <LinearGradient
        colors={[`${theme.colors.primary}`, `${theme.colors.primary}90`]}
        style={styling.gradient}
      />
      <Text style={styling.text}>{text}</Text>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.base,
  },
  text: {
    fontSize: 8,
    textAlign: 'center',
    zIndex: 2,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
})

TextOnlyComponent.propTypes = {
  theme: PropTypes.any,
  post: PropTypes.any,
}

export default withTranslation()(withTheme(TextOnlyComponent))
