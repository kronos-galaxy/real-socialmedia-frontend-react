import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Image,
} from 'react-native'
import ImageComponent from 'templates/Image'
import Layout from 'constants/Layout'
import LinearGradient from 'react-native-linear-gradient'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ModalPreview = ({
  t,
  theme,
  post,
  renderUri,
}) => {
  const styling = styles(theme)
  const thumbnailSource = { uri: path(['image', 'url64p'])(post) }
  const imageSource = { uri: path(['image', 'url1080p'])(post) }

  return (
    <View style={styling.preview}>
      <LinearGradient
        colors={[`${theme.colors.backgroundPrimary}10`, theme.colors.backgroundPrimary]}
        style={styling.gradient}
      />

      {!renderUri ?
        <ImageComponent
          thumbnailSource={thumbnailSource}
          imageSource={imageSource}
          priorityIndex={0}
        />
      : null}

      {renderUri ?
        <Image
          source={{ uri: renderUri }}
          style={styling.image}
        />
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  preview: {
    height: Layout.window.width,
    width: Layout.window.width,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

ModalPreview.propTypes = {
  theme: PropTypes.any,
  thumbnailSource: PropTypes.any,
  imageSource: PropTypes.any,
}

export default withTranslation()(withTheme(ModalPreview))
