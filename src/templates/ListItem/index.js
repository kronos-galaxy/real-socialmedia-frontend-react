import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import path from 'ramda/src/path'
import { getDimensionsFromPostSize } from 'services/Camera'
import PinchZoom from 'templates/ListItem/PinchZoom'
import Layout from 'constants/Layout'
import LinearGradient from 'react-native-linear-gradient'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ListItemTemplate = ({
  t,
  theme,
  children,
  post,
  feedRef,
}) => {
  const styling = styles(theme)
  const image = path(['image'])(post)
  const color = path(['image', 'colors', 0])(post)

  if (!image) {
    return null
  }

  const primaryGradient = `rgb(${color.r}, ${color.g}, ${color.b})`

  return (
    <PinchZoom
      style={[styling.root, getDimensionsFromPostSize(image)]}
      image={image}
      feedRef={feedRef}
    >
      <LinearGradient
        colors={[`${primaryGradient}`, `${theme.colors.backgroundSecondary}50`]}
        style={styling.gradient}
      />

      <View style={styling.component}>
        <View style={styling.nested}>
          {children}
        </View>
      </View>
    </PinchZoom>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    position: 'relative',
    zIndex: 10,
  },
  component: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  nested: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFill,
  },
})

ListItemTemplate.defaultProps = {
}

ListItemTemplate.propTypes = {
  theme: PropTypes.any,
  children: PropTypes.any,
}

export default withTranslation()(withTheme(ListItemTemplate))
