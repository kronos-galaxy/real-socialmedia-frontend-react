import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  View,
  StyleSheet,
  Image,
} from 'react-native'
import SimpleCacheService from 'components/SimpleCache/index.service'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

class ProgressiveImage extends React.Component {
  state = {
    progress: 0,
  }

  render() {
    const {
      style,
      hideProgress,
      thumbnailSource,
      priorityIndex,
      resizeMode,
      thumbnailBlurRadius,
      imageSource,
    } = this.props

    return (
      <View style={style}>
        {!hideProgress ?
          <View style={styles.progress}>
            <AnimatedCircularProgress
              size={50}
              width={2}
              fill={this.state.progress}
              tintColor="#00e0ff"
              backgroundColor="#3d5875"
            />
          </View>
        : null}
  
        <SimpleCacheService source={thumbnailSource} priorityIndex={priorityIndex}>
          {(cache) => (
            <Animated.View style={[styles.image]}>
              <Image
                source={cache.source}
                onError={({ nativeEvent }) => cache.onError(nativeEvent)}
                style={[styles.image, styles.thumbnail, style]}
                resizeMode={resizeMode}
                blurRadius={thumbnailBlurRadius}
              />
            </Animated.View>
          )}
        </SimpleCacheService>
  
        <SimpleCacheService source={imageSource} priorityIndex={priorityIndex}>
          {(cache) => (
            <Animated.View style={[styles.image]}>
              <Image
                source={cache.source}
                onError={({ nativeEvent }) => cache.onError(nativeEvent)}
                style={[styles.image, style]}
                resizeMode={resizeMode}
                onProgress={({ nativeEvent: { loaded, total } }) => {
                  this.setState({ progress: parseInt(loaded / total * 100, 10) })
                }}
              />
            </Animated.View>
          )}
        </SimpleCacheService>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  thumbnail: {
    zIndex: 0,
  },
  progress: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
 })

ProgressiveImage.propTypes = {
  style: PropTypes.any,
  hideProgress: PropTypes.any,
  thumbnailSource: PropTypes.any,
  priorityIndex: PropTypes.any,
  resizeMode: PropTypes.any,
  thumbnailBlurRadius: PropTypes.any,
  imageSource: PropTypes.any,
}

ProgressiveImage.defaultProps = {
  thumbnailBlurRadius: 5,
  resizeMode: 'cover',
}

function areEqual(prevProps, nextProps) {
  return (
    prevProps.imageSource.uri ===  nextProps.imageSource.uri &&
    prevProps.thumbnailSource.uri ===  nextProps.thumbnailSource.uri
  )
}

export default memo(ProgressiveImage, areEqual)