import React from 'react'
import Svg, { G, Polygon, Polyline } from 'react-native-svg'

const Direct = ({ fill = '#333', style = {} }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Polyline fill="none" points="23 5 23 18 19 18 19 22 13 18 12 18"/>
      <Polygon fill="none" points="19 2 1 2 1 14 5 14 5 19 12 14 19 14 19 2" stroke={fill}/>
    </G>
  </Svg>
)

export default Direct
