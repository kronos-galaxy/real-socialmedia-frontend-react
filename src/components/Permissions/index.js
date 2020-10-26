import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import FeatureComponent from 'templates/Feature'
import Modal from 'react-native-modal'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const CameraPermissions = () => (
  <React.Fragment>
    <FeatureComponent active>Open Settings app on your iPhone or iPad.</FeatureComponent>
    <FeatureComponent active>Tap the "Privacy" menu item.</FeatureComponent>
    <FeatureComponent active>Tap the "Photos" menu item.</FeatureComponent>
    <FeatureComponent active>Find "REAL" in the list of apps and tap it.</FeatureComponent>
    <FeatureComponent active>Tap the "Read and Write" option to allow photo access by the REAL app.</FeatureComponent>
  </React.Fragment>
)

const LocationPermissions = () => (
  <React.Fragment>
    <FeatureComponent active>Open Settings app on your iPhone or iPad.</FeatureComponent>
    <FeatureComponent active>Tap the "Privacy" menu item.</FeatureComponent>
    <FeatureComponent active>Tap the "Location" menu item.</FeatureComponent>
    <FeatureComponent active>Find "REAL" in the list of apps and tap it.</FeatureComponent>
    <FeatureComponent active>Tap the "While Using the App" option to allow photo access by the REAL app.</FeatureComponent>
  </React.Fragment>
)

const Permissions = ({
  t,
  theme,
  openSettings,
  camera,
  location,
}) => {
  const styling = styles(theme)
  
  return (
    <Modal isVisible={true}>
      <View style={styling.root}>
        <View style={styling.features}>
          {camera ?
            <CameraPermissions />
          : null}

          {location ?
            <LocationPermissions />
          : null}
        </View>

        <View style={styling.action}>
          <DefaultButton label={t('Privacy Settings')} onPress={openSettings} />
        </View>
      </View>
    </Modal>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    backgroundColor: theme.colors.backgroundSecondary,
    marginVertical: 40,
    borderRadius: 4,
    overflow: 'hidden',
    padding: theme.spacing.base,
  },
  features: {
    marginVertical: theme.spacing.base,
  },
  action: {
    padding: theme.spacing.base,
  },
})

Permissions.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  openSettings: PropTypes.any,
  camera: PropTypes.any,
  location: PropTypes.any,
}

export default withTranslation()(withTheme(Permissions))
