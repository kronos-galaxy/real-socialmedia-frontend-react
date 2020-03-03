import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import path from 'ramda/src/path'
import { getPhotoProportions } from 'services/Camera'
import PinchZoom from 'templates/ListItem/PinchZoom'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const ListItemTemplate = ({
  theme,
  children,
  post,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const image = path(['image'])(post)

  if (!image) {
    return null
  }

  const getDimensionsFromPostSize = ({ width: inputWidth, height: inputHeight }) => {
    const { x, y } = getPhotoProportions(inputWidth, inputHeight)
    return { width: x, height: y }
  }

  return (
    <PinchZoom style={[styling.root, getDimensionsFromPostSize(image)]}>
      <View style={styling.component}>
        {children}
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
})

ListItemTemplate.defaultProps = {
}

ListItemTemplate.propTypes = {
  theme: PropTypes.any,
  children: PropTypes.any,
}

export default withTheme(ListItemTemplate)
