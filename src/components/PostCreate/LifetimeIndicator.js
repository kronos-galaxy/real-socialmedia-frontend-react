import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import { Caption } from 'react-native-paper'
import Layout from 'constants/Layout'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const trackerWidth = (Layout.window.width - 24) - 28

const LifetimeIndicator = ({
  theme,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={[{ left: '0%' }, styling.indicator]}>
        <View style={styling.bar} />
        <Caption style={[styling.caption, styling.captionStart]}>{t('Day')}</Caption>
      </View>
      <View style={[{ left: '25%', }, styling.indicator]}>
        <View style={styling.bar} />
        <Caption style={styling.caption}>{t('Week')}</Caption>
      </View>
      <View style={[{ left: '50%', }, styling.indicator]}>
        <View style={styling.bar} />
        <Caption style={styling.caption}>{t('Month')}</Caption>
      </View>
      <View style={[{ left: '75%', }, styling.indicator]}>
        <View style={styling.bar} />
        <Caption style={styling.caption}>{t('Year')}</Caption>
      </View>
      <View style={[{ left: '100%', }, styling.indicator]}>
        <View style={styling.bar} />
        <Caption style={[styling.caption, styling.captionEnd]}>{t('Forever')}</Caption>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: trackerWidth,
    height: 20,
    marginBottom: 6,
  },
  indicator: {
    width: 24,
    height: 24,
    position: 'absolute',
    alignItems: 'center',
  },
  bar: {
    height: 6,
    backgroundColor: theme.colors.border,
    marginLeft: 2,
  },
  caption: {
    position: 'absolute',
    width: 100,
    paddingTop: 2,
    textAlign: 'center',
    color: theme.colors.border,
    marginLeft: 2,
  },
  captionStart: {
    textAlign: 'left',
    left: 0,
  },
  captionEnd: {
    textAlign: 'right',
    right: 0,
  },
})

export default withTheme(LifetimeIndicator)