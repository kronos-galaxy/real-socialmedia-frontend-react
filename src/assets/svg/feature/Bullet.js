import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Polyline } from 'react-native-svg'

const Bullet = ({ fill = '#333' }) => (
  <Svg height={32} width={32} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Polyline fill="none" points="6,12 10,16 18,8 " stroke={fill} />
    </G>
  </Svg>
)

Bullet.propTypes = {
  fill: PropTypes.string,
}

export default Bullet
