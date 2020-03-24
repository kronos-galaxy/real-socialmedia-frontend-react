import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Subheading } from 'react-native-paper'
import TickIcon from 'assets/svg/membership/Tick'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Bookmark = ({
  t,
  theme,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <View style={styling.icon}>
        <TickIcon fill={theme.colors.primary} />
      </View>
      <View style={styling.text}>
        <Subheading>{t('You\'re All Caught Up')}</Subheading>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    padding: theme.spacing.base,
    backgroundColor: theme.colors.backgroundSecondary,
    alignItems: 'center',
  },
  icon: {
    backgroundColor: theme.colors.text,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  text: {
    marginTop: theme.spacing.base,
  },
})

Bookmark.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
}

export default withTranslation()(withTheme(Bookmark))
