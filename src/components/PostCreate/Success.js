import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import { Subheading } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Success = ({
  theme,
  navigation,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <Subheading>{t('All posts have been submitted')}</Subheading>
      <Subheading>{t('You can safely close this window now')}</Subheading>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    padding: theme.spacing.base,
    alignItems: 'center',
  },
  text: {
  },
})

Success.propTypes = {
  theme: PropTypes.any,
  values: PropTypes.any,
  setFieldValue: PropTypes.any,
}

export default withNavigation(
  withTheme(Success)
)
