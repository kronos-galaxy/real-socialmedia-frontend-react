import React from 'react'
import {
  View,
  StyleSheet,
  Animated,
} from 'react-native'
import { getDimensionsFromPostSize } from 'services/Camera'
import ImageComponent from 'templates/Image'
import { withTheme } from 'react-native-paper'
import ContextComponent from 'components/PostsList/Context'

export class PinchZoom extends React.Component {
  render() {
    const styling = styles(this.props.theme)

    if (!this.props.draggedImage || !this.props.draggedImage.image) {
      return null
    }

    return (
      <View style={[StyleSheet.absoluteFill, styling.root]}>
        <Animated.View style={[
          getDimensionsFromPostSize({
            width: this.props.draggedImage.image.width,
            height: this.props.draggedImage.image.height,
          }), {
            transform: this.props.draggedImage.transform,
          }]}
        >
          <ImageComponent
            thumbnailSource={{ uri: this.props.draggedImage.image.url64p }}
            imageSource={{ uri: this.props.draggedImage.image.url4k }}
            priorityIndex={1}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    )
  }
}

PinchZoom.defaultProps = {
}

PinchZoom.propTypes = {
}

const styles = theme => StyleSheet.create({
  root: {
    zIndex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000095'
  },
})

export default withTheme((props) => (
  <ContextComponent.Consumer>
    {(contextProps) => (
      <PinchZoom {...contextProps} {...props} />
    )}
  </ContextComponent.Consumer>
))

