import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { withTranslation } from 'react-i18next'

const Actions = ({
  t,
  handleLibrarySnap,
  handleCameraSnap,
  skipPhotoUpload,
}) => {
  const styling = styles
  
  return (
    <View style={styling.root}>
      <View style={styling.item}>
        <DefaultButton testID="components/AuthPhoto/Actions/photo" label={t('Take Photo')} onPress={handleCameraSnap} loading={false} />
      </View>
      <View style={styling.item}>
        <DefaultButton testID="components/AuthPhoto/Actions/library" label={t('Choose from Library')} onPress={handleLibrarySnap} loading={false} />
      </View>
      <View style={styling.item}>
        <DefaultButton testID="components/AuthPhoto/Actions/skip" label={t('Skip Photo Upload')} onPress={skipPhotoUpload} loading={false} />
      </View>
    </View>
  )
}

Actions.propTypes = {
  t: PropTypes.any,
  handleLibrarySnap: PropTypes.any,
  handleCameraSnap: PropTypes.any,
  skipPhotoUpload: PropTypes.any,
}

const styles = StyleSheet.create({
  root: {
  },
  item: {
    marginBottom: 12,
  },
})

export default withTranslation()(Actions)
