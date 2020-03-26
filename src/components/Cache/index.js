import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Image,
  ActivityIndicator,
  View,
} from 'react-native'
import { withTheme } from 'react-native-paper'
import {
  queueImage,
} from 'components/Cache/Fetch'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

/**
 * UI Component
 */
const CacheComponent = ({
  theme,
  images,
  resizeMode,
  priorityIndex,
  style,
  hideProgress,
}) => {
  const styling = styles(theme)
  const [uri, setUri] = useState(null)
  const [progress, setProgress] = useState(0)
  const [progressVisible, setProgressVisible] = useState(hideProgress)
  const [blurRadius, setBlurRadius] = useState(10)

  useEffect(() => {
    images.forEach((source, index) => {
      const priority = index * 10000 + priorityIndex
  
      queueImage(
        /**
         * Callback executed on complete
         */
        (error, response) => {
          setUri(response)
          setProgressVisible(false)
          if (index > 0) {
            setBlurRadius()
          }
        },

        /**
         * Callback executed on download progress
         */
        (response) => {
          setProgress(parseInt(response.bytesWritten / response.contentLength * 100, 10))
        },

        /**
         * Callback executed on download init
         */
        (response) => {
          setProgress(0)
          setProgressVisible(true)
        },
    
        /**
         * Image source
         */
        source,
    
        /**
         * Priority of the image, usually is the position of the item in list
         */
        priority
      )
    })
  }, [])

  /**
   * Show loading indicator image if placeholder image is not loaded, yet.
   */
  if (!uri && !progress) {
    return (
      <ActivityIndicator
        style={styling.image}
      />
    )
  }

  return (
    <View style={styling.root}>
      <View style={[styling.image, style]}>
        {progressVisible ?
          <View style={styling.progress}>
            <AnimatedCircularProgress
              size={50}
              width={2}
              fill={progress}
              tintColor="#00e0ff"
              backgroundColor="#3d5875"
            />
          </View>
        : null}

        {uri ?
          <Image
            source={{ uri }}
            resizeMode={resizeMode}
            style={[styling.image, style]}
            blurRadius={blurRadius}
          />
        : null}
      </View>
    </View>
  )
}

CacheComponent.propTypes = {
  theme: PropTypes.any,
  images: PropTypes.any,
  resizeMode: PropTypes.any,
  priorityIndex: PropTypes.any,
  style: PropTypes.any,
}

CacheComponent.propTypes = {
  hideProgress: false,
}

const styles = theme => StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
})

export const CacheContext = React.createContext(null)
export default withTheme(CacheComponent)