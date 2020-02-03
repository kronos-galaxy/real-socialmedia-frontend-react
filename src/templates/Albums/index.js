import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Albums = ({
  theme,
  items,
}) => {
  const styling = styles(theme)

  return (
    <ScrollView horizontal>
      <View style={styling.root} horizontal>
        <View style={[styling.album, styling.spacingRight]}>
        </View>
        <View style={[styling.album, styling.spacingRight]}>
        </View>
        <View style={[styling.album, styling.spacingRight]}>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  album: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  spacingRight: {
    marginRight: theme.spacing.base,
  }
})

Albums.propTypes = {
  theme: PropTypes.any,
  items: PropTypes.any,
}

export default withTheme(Albums)
