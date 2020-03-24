import React from 'react'
import Svg, { G, Circle, Polyline } from 'react-native-svg'

const Checked = ({ fill = '#333', style = {} }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="2">
      <Polyline fill="none" points=" 6,12 10,16 18,8 "/>
      <Circle cx="12" cy="12" fill="none" r="11" stroke={fill}/>
    </G>
  </Svg>
)

export default Checked
