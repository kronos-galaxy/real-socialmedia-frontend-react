import React from 'react'
import PropTypes from 'prop-types'
import Svg, { Path } from 'react-native-svg'

const More = ({ fill = '#000000', style = {} }) => (
  <Svg width="14" height="14" style={style} fill={fill} viewBox="0 0 40 10">
    <Path d="M5 0.5C7.49 0.5 9.5 2.51 9.5 5C9.5 7.49 7.49 9.5 5 9.5C2.51 9.5 0.5 7.49 0.5 5C0.5 2.51 2.51 0.5 5 0.5ZM20 0.5C22.49 0.5 24.5 2.51 24.5 5C24.5 7.49 22.49 9.5 20 9.5C17.51 9.5 15.5 7.49 15.5 5C15.5 2.51 17.51 0.5 20 0.5ZM35 0.5C37.49 0.5 39.5 2.51 39.5 5C39.5 7.49 37.49 9.5 35 9.5C32.51 9.5 30.5 7.49 30.5 5C30.5 2.51 32.51 0.5 35 0.5Z" />
  </Svg>
)

More.propTypes = {
  fill: PropTypes.string,
  style: PropTypes.any,
}

export default More
