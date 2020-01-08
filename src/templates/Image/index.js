import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import ProgressiveImage from 'components/ProgressiveImage'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const ImageTemplate = ({
  theme,
  thumbnailSource,
  imageSource,
  resizeMode,
  shouldLoadImage,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <ProgressiveImage
        style={styling.photo}
        imageSource={imageSource}
        thumbnailSource={thumbnailSource}
        resizeMode={resizeMode}
        shouldLoadImage={shouldLoadImage}
      />
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
})

ImageTemplate.defaultProps = {
  children: () => {},
}

ImageTemplate.propTypes = {
  theme: PropTypes.any,
  uri: PropTypes.any,
  resizeMode: PropTypes.any,
}

export default withTheme(ImageTemplate)
