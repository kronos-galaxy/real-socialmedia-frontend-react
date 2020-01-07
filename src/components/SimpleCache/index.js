import React from 'react'
import SimpleCacheService from './index.service'
import Image from 'react-native-image-progress'

const SimpleCache = ({
  source,
  style,
  resizeMode,
  cacheOnly,
  ...props
}) => {
  return (
    <React.Fragment>
      <Image
        source={source}
        style={style}
        resizeMode={resizeMode}
        cacheOnly={cacheOnly}
        {...props}
      />
    </React.Fragment>
  )
}

export default (props) => (
  <SimpleCacheService {...props}>
    {(service) => (
      <SimpleCache {...props} {...service} />
    )}
  </SimpleCacheService>
)