import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'

const UserRowTemplate = ({
  avatar,
  content,
  action,
  onPress,
}) => {
  const styling = styles
  
  return (
    <TouchableOpacity style={styling.root} onPress={onPress} disabled={!onPress}>
      <View style={styling.component}>
        <View style={styling.avatar}>{avatar}</View>
        <View style={styling.content}>{content}</View>
        <View style={styling.action}>{action}</View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
  },
  content: {
    flex: 1,
  },
  action: {
  },
})

UserRowTemplate.defaultProps = {
}

UserRowTemplate.propTypes = {
  avatar: PropTypes.any,
  content: PropTypes.any,
  action: PropTypes.any,
  onPress: PropTypes.any,
}

export default UserRowTemplate
