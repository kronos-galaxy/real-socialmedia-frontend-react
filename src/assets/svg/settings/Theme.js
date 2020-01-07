import React from 'react'
import Svg, { G, Path, Circle } from 'react-native-svg'

const Theme = ({ fill = '#333', style = {} }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Path d="M2,12c0,0,4-6,10-6 c6,0,10,6,10,6s-4,6-10,6C6,18,2,12,2,12z" fill="none" stroke={fill}/>
      <Circle cx="12" cy="10" fill="none" r="4"/>
    </G>
  </Svg>
)

export default Theme
