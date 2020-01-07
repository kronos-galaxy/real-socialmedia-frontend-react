import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import Layout from 'constants/Layout'
import { ifIphoneX } from 'react-native-iphone-x-helper'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const CameraComponent = ({
  theme,
  steps,
  header,
  content,
  footer,
  selector,
  wrapper,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      {wrapper}

      <View style={styling.camera}>
        <View style={styling.steps}>
          {steps}
        </View>

        <View style={styling.header}>
          {header}
        </View>

        <View style={styling.content}>
          {content}
        </View>

        <View style={styling.footer}>
          {footer}
        </View>

        <View style={styling.selector}>
          {selector}
        </View>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
  },
  steps: {
    position: 'absolute',
    zIndex: 1,
    height: 30,
    left: 0,
    right: 0,
    ...ifIphoneX({
      top: 40,
    }, {
      top: 0,
    }),
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
    height: 40,
    ...ifIphoneX({
      top: 70,
    }, {
      top: 30,
    }),
  },
  camera: {
    backgroundColor: theme.colors.backgroundPrimary,
    width: Layout.window.width,
    height: Layout.window.height,
    flex: 1,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    height: 150,
    zIndex: 1,
  },
  selector: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 1,
  },
})

CameraComponent.propTypes = {
  theme: PropTypes.any,
  steps: PropTypes.any,
  header: PropTypes.any,
  content: PropTypes.any,
  footer: PropTypes.any,
  selector: PropTypes.any,
  wrapper: PropTypes.any,
}

export default withNavigation(
  withTheme(CameraComponent)
)
