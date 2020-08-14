import React from 'react'
import PropTypes from 'prop-types'
import Svg, { Path } from 'react-native-svg'

const Fav = ({ fill = '#333', style = {} }) => (
  <Svg width="18" height="18" style={style} fill={fill} viewBox="0 0 63 71">
    <Path d="M59.54 70C58.95 70 58.38 69.79 57.92 69.38L31 44.18L5.07 69.38C4.35 70.03 3.32 70.18 2.43 69.78C1.56 69.37 0.99 68.49 0.99 67.51L0.99 3.49C0.99 2.11 2.09 1 3.45 1L59.54 1C60.9 1 62 2.11 62 3.49L62 67.51C62 68.49 61.44 69.37 60.56 69.78C60.23 69.93 59.88 70 59.54 70ZM31 38.38C31.57 38.38 32.15 38.58 32.62 38.99L57.08 62.01L57.08 5.98L5.91 5.98L5.91 62.01L29.37 38.99C29.84 38.58 30.42 38.38 31 38.38Z" />
  </Svg>
)

Fav.propTypes = {
  fill: PropTypes.string,
  style: PropTypes.any,
}

export default Fav
