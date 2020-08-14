import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Circle } from 'react-native-svg'

const Tick = ({ fill = '#333' }) => (
  <Svg height={32} width={32} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1">
      <Circle cx="12" cy="12" fill="none" r="4" stroke={fill} />
    </G>
  </Svg>
)

Tick.propTypes = {
  fill: PropTypes.string,
}

export default Tick
