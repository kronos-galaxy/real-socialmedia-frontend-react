import React from 'react'
import Svg, { G, Polyline, Rect } from 'react-native-svg'

const Portrait = ({ fill = '#ffffff', style = {} }) => (
  <Svg height={18} width={18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="2">
      <Rect height="14" width="7" fill="none" x="9" y="5"/>
    </G>
  </Svg>
)

export default Portrait
