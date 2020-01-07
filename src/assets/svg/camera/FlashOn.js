import React from 'react'
import Svg, { G, Polygon } from 'react-native-svg'

const FlashOn = ({ fill = '#333', style = {} }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="2">
      <Polygon fill="none" points="13,3 3,14 12,14 11,21 21,10 12,10 " stroke={fill}/>
    </G>
  </Svg>
)

export default FlashOn
