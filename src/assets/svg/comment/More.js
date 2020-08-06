import React from 'react'
import Svg, { G, Line, Circle } from 'react-native-svg'

const Delete = ({ fill = '#333', style = {} }) => (
  <Svg height={18} width={18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Circle cx="12" cy="12" fill={fill} r="2"/>
			<Circle cx="3" cy="12" fill={fill} r="2" />
			<Circle cx="21" cy="12" fill={fill} r="2" />
    </G>
  </Svg>
)

export default Delete
