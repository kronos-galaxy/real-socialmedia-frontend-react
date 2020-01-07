import React from 'react'
import Svg, { G, Polyline } from 'react-native-svg'

const Right = ({ fill = '#333', style = {} }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Polyline fill="none" points="7,2 17,12 7,22 " stroke={fill} transform="translate(0, 0)"/>
    </G>
  </Svg>
)

export default Right
