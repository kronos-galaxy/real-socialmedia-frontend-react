import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import { Text } from 'react-native-paper'
import TickIcon from 'assets/svg/feature/Tick'
import BulletIcon from 'assets/svg/feature/Bullet'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Feature = ({
  theme,
  children,
  active,
  disabled,
}) => {
  const styling = styles(theme)

  const fill = active ? theme.colors.primary : theme.colors.text

  return (
    <View style={styling.root}>
      <View style={styling.icon}>
        {!disabled ?
          <TickIcon fill={fill} />
        : null}
      </View>
      <Text style={styling.text}>{children}</Text>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    margin: 6,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  icon: {
    marginRight: theme.spacing.base,
  },
  text: {
    fontSize: 14,
  },
})

Feature.propTypes = {
  theme: PropTypes.any,
}

export default withTheme(Feature)