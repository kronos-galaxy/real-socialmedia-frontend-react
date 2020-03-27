import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import Layout from 'constants/Layout'
import LinearGradient from 'react-native-linear-gradient'
import path from 'ramda/src/path'
import CacheComponent from 'components/Cache'

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
        <CacheComponent
          images={[
            thumbnailSource.uri,
            imageSource.uri,
          ]}
          fallback={imageSource.uri}
          type="default"
          priorityIndex={1}
          resizeMode="cover"
        />
      : null}

      {renderUri ?
        <CacheComponent
          images={[
            renderUri,
          ]}
          fallback={renderUri}
          type="default"
          priorityIndex={1}
          resizeMode="cover"
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
