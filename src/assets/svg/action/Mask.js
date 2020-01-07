import React from 'react'
import Svg, { Path } from 'react-native-svg'

const Mask = ({ fill = '#333', style = {} }) => (
  <Svg width="18" height="18" style={style} fill={fill} viewBox="0 0 97 97">
    <Path d="M49 0C75.51 0 97 21.49 97 48C97 74.51 75.51 96 49 96C22.49 96 1 74.51 1 48C1 21.49 22.49 0 49 0Z" />
  </Svg>
)

export default Mask
