import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const ListTemplate = ({
  theme,
  children,
  items,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      {items.map((item, key) => (
        <View style={styling.item} key={key}>
          {children(item)}
        </View>
      ))}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
})

ListTemplate.defaultProps = {
  items: [],
  children: () => {},
}

ListTemplate.propTypes = {
  theme: PropTypes.any,
  children: PropTypes.any,
  items: PropTypes.any,
}

export default withTheme(ListTemplate)
