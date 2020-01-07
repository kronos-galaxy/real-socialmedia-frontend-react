import React from 'react'
import Svg, { G, Polyline, Circle } from 'react-native-svg'

const Quality = ({ fill = '#333', style = {} }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="2">
      <Polyline fill="none" points=" 10,15 8,15 8,9 10,9 "/>
      <Polyline fill="none" points=" 14,15 16,15 16,9 14,9 "/>
      <Circle cx="12" cy="12" fill="none" r="11" stroke={fill}/>
    </G>
  </Svg>
)

export default Quality
