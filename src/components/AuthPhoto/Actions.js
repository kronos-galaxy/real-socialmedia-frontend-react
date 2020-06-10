import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Actions = ({
  t,
  theme,
  handleLibrarySnap,
  handleCameraSnap,
  skipPhotoUpload,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  
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
  theme: PropTypes.any,
  t: PropTypes.any,
  handleLibrarySnap: PropTypes.any,
  handleCameraSnap: PropTypes.any,
  skipPhotoUpload: PropTypes.any,
}

const styles = theme => StyleSheet.create({
  root: {
  },
  item: {
    marginBottom: 12,
  },
})

export default withTranslation()(withTheme(Actions))
