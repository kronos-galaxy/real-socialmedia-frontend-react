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
import TextOnlyComponent from 'templates/TextOnly'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const PostPreview = ({
  t,
  theme,
  text: {
    text,
  },
  image: {
    thumbnailSource,
    imageSource,
  },
  renderUri,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.preview}>
      <LinearGradient
        colors={[`${theme.colors.backgroundPrimary}10`, theme.colors.backgroundPrimary]}
        style={styling.gradient}
      />

      {text ?
        <TextOnlyComponent
          text={text}
        />
      : null}

      {!text && !renderUri ?
        <CacheComponent
          images={[
            [thumbnailSource.uri, true],
            [imageSource.uri, true],
          ]}
          fallback={imageSource.uri}
          priorityIndex={1}
          resizeMode="cover"
        />
      : null}

      {!text && renderUri ?
        <CacheComponent
          images={[
            [renderUri, true],
          ]}
          fallback={renderUri}
          priorityIndex={1}
          resizeMode="cover"
        />
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  preview: {
    height: 160,
    width: Layout.window.width,
    overflow: 'hidden',
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

PostPreview.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  thumbnailSource: PropTypes.any,
  imageSource: PropTypes.any,
  renderUri: PropTypes.any,
}

export default withTranslation()(withTheme(PostPreview))
