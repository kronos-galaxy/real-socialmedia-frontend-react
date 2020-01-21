import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  View,
  StyleSheet,
  Image,
} from 'react-native'
import SimpleCacheService from 'components/SimpleCache/index.service'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

export default class ProgressiveImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageOpacity: new Animated.Value(0),
      thumbnailOpacity: new Animated.Value(0),
      thumbnailLoaded: false,
      progress: 0,
    }
  }

  onLoadThumbnail() {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 1,
      duration: this.props.thumbnailFadeDuration,
      useNativeDriver: true,
    }).start()
    this.props.onLoadThumbnail()
    this.setState({ thumbnailLoaded: true })
  }

  onLoadImage() {
    Animated.timing(this.state.imageOpacity, {
      toValue: 1,
      duration: this.props.imageFadeDuration,
      useNativeDriver: true,
    }).start()
    this.props.onLoadImage()
  }

  render() {
    return (
      <View style={this.props.style}>
        {!this.props.hideProgress ?
          <View style={styles.progress}>
            <AnimatedCircularProgress
              size={50}
              width={2}
              fill={this.state.progress}
              tintColor="#00e0ff"
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#3d5875"
            />
          </View>
        : null}

        <SimpleCacheService source={this.props.thumbnailSource} priorityIndex={this.props.priorityIndex}>
          {(cache) => (
            <Animated.View style={[styles.image, { opacity: this.state.thumbnailOpacity }]}>
              <Image
                source={cache.source}
                onError={({ nativeEvent }) => cache.onError(nativeEvent)}
                style={[styles.image, styles.thumbnail, this.props.style]}
                resizeMode={this.props.resizeMode}
                onLoad={() => this.onLoadThumbnail()}
                blurRadius={this.props.thumbnailBlurRadius}
              />
            </Animated.View>
          )}
        </SimpleCacheService>

        <SimpleCacheService source={this.props.imageSource} priorityIndex={this.props.priorityIndex}>
          {(cache) => (
            <Animated.View style={[styles.image, { opacity: this.state.imageOpacity }]}>
              <Image
                source={cache.source}
                onError={({ nativeEvent }) => cache.onError(nativeEvent)}
                style={[styles.image, this.props.style]}
                resizeMode={this.props.resizeMode}
                onLoad={() => this.onLoadImage()}
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
  placeHolderColor: PropTypes.string,
  placeHolderSource: PropTypes.number,
  imageSource: PropTypes.object.isRequired,
  imageFadeDuration: PropTypes.number.isRequired,
  onLoadThumbnail: PropTypes.func.isRequired,
  onLoadImage: PropTypes.func.isRequired,
  thumbnailSource: PropTypes.object.isRequired,
  thumbnailFadeDuration: PropTypes.number.isRequired,
  thumbnailBlurRadius: PropTypes.number,
  shouldLoadImage: PropTypes.bool,
}

ProgressiveImage.defaultProps = {
  thumbnailFadeDuration: 250,
  imageFadeDuration: 250,
  thumbnailBlurRadius: 5,
  onLoadThumbnail: Function.prototype,
  onLoadImage: Function.prototype,
  resizeMode: 'cover',
  shouldLoadImage: true,
}
