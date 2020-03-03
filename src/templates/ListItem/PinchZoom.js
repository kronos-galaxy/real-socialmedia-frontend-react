import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
} from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'

export class PinchZoom extends React.Component {
  baseScale = new Animated.Value(1)
  pinchScale = new Animated.Value(1)
  scale = Animated.multiply(this.baseScale, this.pinchScale)
  lastScale = 1
  onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: this.pinchScale } }],
    { useNativeDriver: false }
  )

  onPinchHandlerStateChange = event => {
    const lastScale = this.lastScale * event.nativeEvent.scale
    if (event.nativeEvent.oldState === State.ACTIVE && lastScale > 1) {
      this.lastScale = lastScale
      this.baseScale.setValue(this.lastScale)
      this.pinchScale.setValue(1)
    }

    if (event.nativeEvent.state === State.END) {
      this.lastScale = 1
      this.baseScale.setValue(1)
      this.pinchScale.setValue(1)
    }
  }

  render() {
    return (
      <PinchGestureHandler
        onGestureEvent={this.onPinchGestureEvent}
        onHandlerStateChange={this.onPinchHandlerStateChange}
      >
        <Animated.View style={[this.props.style, {
          transform: [
            { perspective: 200 },
            { scale: this.scale },
          ],
        }]}>
          {this.props.children}
        </Animated.View>
      </PinchGestureHandler>
    )
  }
}

PinchZoom.defaultProps = {
}

PinchZoom.propTypes = {
}

export default PinchZoom
