import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
} from 'react-native'
import {
  PinchGestureHandler,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler'

export class PinchZoom extends React.Component {
  baseScale = new Animated.Value(1)
  pinchScale = new Animated.Value(1)
  scale = Animated.multiply(this.baseScale, this.pinchScale)
  lastScale = 1

  translateX = new Animated.Value(0)
  translateY = new Animated.Value(0)
  lastOffset = { x: 0, y: 0 }

  panRef = React.createRef()
  pinchRef = React.createRef()

  onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: this.pinchScale } }],
    { useNativeDriver: false }
  )

  onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: this.translateX, translationY: this.translateY }, }],
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

  onPanHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastOffset.y += event.nativeEvent.translationY
      this.lastOffset.x += event.nativeEvent.translationX
      this.translateX.setOffset(this.lastOffset.x)
      this.translateX.setValue(0)
      this.translateY.setOffset(this.lastOffset.y)
      this.translateY.setValue(0)
    }

    if (event.nativeEvent.state === State.END) {
      this.lastOffset.y = 0
      this.lastOffset.x = 0
      this.translateX.setOffset(0)
      this.translateX.setValue(0)
      this.translateY.setOffset(0)
      this.translateY.setValue(0)
    }
  }

  render() {
    return (
      <PanGestureHandler
        onGestureEvent={this.onPanGestureEvent}
        onHandlerStateChange={this.onPanHandlerStateChange}
        minPointers={2}
        maxPointers={2}
        ref={this.panRef}
      >
        <Animated.View>
          <PinchGestureHandler
            onGestureEvent={this.onPinchGestureEvent}
            onHandlerStateChange={this.onPinchHandlerStateChange}
            simultaneousHandlers={this.panRef}
            minPointers={2}
            maxPointers={2}
            ref={this.pinchRef}
          >
            <Animated.View style={[this.props.style, {
              transform: [
                { perspective: 200 },
                { scale: this.scale },
                { translateX: this.translateX },
                { translateY: this.translateY },
              ],
            }]}>
              {this.props.children}
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    )
  }
}

PinchZoom.defaultProps = {
}

PinchZoom.propTypes = {
}

export default PinchZoom
