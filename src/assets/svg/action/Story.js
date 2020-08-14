import React from 'react'
import PropTypes from 'prop-types'
import Svg, { Path } from 'react-native-svg'

const Story = ({ fill = '#333', style = {} }) => (
  <Svg width="18" height="18" style={style} fill={fill} viewBox="0 0 115 115">
    <Path d="M57 0C88.48 0 114 25.52 114 57C114 88.48 88.48 114 57 114C25.52 114 0 88.48 0 57C0 25.52 25.52 0 57 0ZM3.56 57C3.56 86.51 27.49 110.44 57 110.44C86.51 110.44 110.44 86.51 110.44 57C110.44 27.49 86.51 3.56 57 3.56C27.49 3.56 3.56 27.49 3.56 57Z" />
  </Svg>
)

Story.propTypes = {
  fill: PropTypes.string,
  style: PropTypes.any,
}

export default Story
