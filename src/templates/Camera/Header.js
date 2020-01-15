import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import CloseIcon from 'assets/svg/camera/Close'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Header = ({
  theme,
  content,
  handleClosePress,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={styling.content}>
        {content}
      </View>

      <View style={styling.action}>
        <View style={styling.actionItem} />
        <TouchableOpacity style={styling.actionItem} onPress={handleClosePress}>
          <CloseIcon
            fill="#ffffff"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 3,
    paddingHorizontal: 24,
  },
  action: {
    flex: 1,
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  actionItem: {
    paddingHorizontal: 12,
  },
})

Header.propTypes = {
  theme: PropTypes.any,
  content: PropTypes.any,
  handleClosePress: PropTypes.any,
}

export default withTheme(Header)
