import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import compose from 'ramda/src/compose'
import Layout from 'constants/Layout'
import prop from 'ramda/src/prop'
import path from 'ramda/src/path'
import useAsync from 'react-use/lib/useAsync'

import { withTheme } from 'react-native-paper'

const MAP_HEIGHT = 240
const MAP_WIDTH = Layout.window.width - 12 * 2
const normalizeCoordinates = (coords) => ({
  latitude: coords.latitude,
  longitude: coords.longitude,
  accuracy: coords.accuracy,
  latitudeDelta: 10,
  longitudeDelta: 10,
})


const MapField = ({
  form,
  field,
}) => {
  const styling = styles
  const mapRef = useRef(null)

  const getCurrentPosition = () => new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      compose(resolve, normalizeCoordinates, prop('coords')),
      reject,
      { timeout: 2000, maximumAge: 1000 },
    )
  })

  const coordinates = useAsync(async () => await getCurrentPosition(), [])

  useEffect(() => {
    if (!coordinates.value) return
    form.setFieldValue(field.name, {
      latitude: coordinates.value.latitude,
      longitude: coordinates.value.longitude,
      accuracy: coordinates.value.accuracy,
    })
  }, [
    path(['value', 'longitude'], coordinates),
    path(['value', 'latitude'], coordinates),
  ])

  if (coordinates.loading || !coordinates.value) {
    return null
  }

  if (coordinates.error) {
    return null
  }

  return (
    <View style={styling.root}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={coordinates.value}
        showsUserLocation
        showsMyLocationButton
        loadingEnabled={true}
        minZoomLevel={14}
     />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    height: MAP_HEIGHT,
    width: MAP_WIDTH,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

MapField.propTypes = {
  field: PropTypes.any,
  form: PropTypes.any,
}

MapField.defaultProps = {
}

export default withTheme(MapField)
