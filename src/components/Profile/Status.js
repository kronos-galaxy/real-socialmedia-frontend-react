import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Caption, Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const ProfileStatus = ({
  theme,
  navigation,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <TouchableOpacity onPress={() => navigation.navigate('Payout')}>
        <Text>
          <Caption>{t('You will be paid {{amount}} dollars per view from other diamond members', { amount: '$0.11' })} </Caption>
          <Caption style={styling.link}>{t('learn more')}</Caption>
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
})

ProfileStatus.propTypes = {
  theme: PropTypes.any,
  navigation: PropTypes.any,
}

export default withNavigation(
  withTheme(ProfileStatus)
)
