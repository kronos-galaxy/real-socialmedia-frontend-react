import React from 'react'
import Svg, { G, Rect } from 'react-native-svg'

const Gallery = ({ fill = '#333', style = {} }) => (
  <Svg height={36} width={36} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Rect height="9" width="9" fill="none" stroke={fill} x="1" y="1"/>
      <Rect height="9" width="9" fill="none" transform="matrix(-1 -4.486867e-11 4.486867e-11 -1 37 11)" x="14" y="1"/>
      <Rect height="9" width="9" fill="none" x="1" y="14"/>
      <Rect height="9" width="9" fill="none" stroke={fill} transform="matrix(-1 -4.486867e-11 4.486867e-11 -1 37 37)" x="14" y="14"/>
    </G>
  </Svg>
)

export default Gallery
