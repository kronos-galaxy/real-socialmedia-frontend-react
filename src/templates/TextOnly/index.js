import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import Layout from 'constants/Layout'
import LinearGradient from 'react-native-linear-gradient'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const TextComponent = ({
  theme,
  children,
  text,
  themeCode,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const themes = useSelector(state => state.theme.themeFetch.data)
  const themeSelector = (activeThemeCode) =>
    ((themes || []).find(theme => theme.key === activeThemeCode) || {}).theme
  const activeTheme = themeSelector(themeCode) || theme

  return (
    <View style={styling.root}>
      <LinearGradient
        colors={[`${activeTheme.colors.primary}`, `${activeTheme.colors.primary}90`]}
        style={styling.gradient}
      />
      <Text style={styling.text}>{text}</Text>
      {children}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    width: Layout.window.width,
    height: Layout.window.width,
    padding: theme.spacing.base * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    zIndex: 2,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
})

TextComponent.propTypes = {
  theme: PropTypes.any,
  post: PropTypes.any,
}

export default withTheme(TextComponent)
