import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import { Subheading } from 'react-native-paper'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import ModalPreviewComponent from 'templates/ModalPreview'
import * as navigationActions from 'navigation/actions'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const OnboardPhoto = ({
  t,
  theme,
  cameraCapture,
  cameraCaptureIdle,
  postsCreateRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  
  const handleRetake = () => {
    cameraCaptureIdle({ uri: path(['data', 0, 'uri'])(cameraCapture) })
    navigationActions.navigateOnboardCamera(navigation, { nextRoute: 'OnboardPhoto' })()
  }

  return (
    <View style={styling.root}>
      {!path(['data', 0, 'uri'])(cameraCapture) ?
        <View style={styling.content}>
          <Subheading style={styling.subheading}>{t('You are all setup! Start with uploading your first photo.')}</Subheading>

          <View style={styling.action}>
            <DefaultButton label={t('Take a Photo')} onPress={navigationActions.navigateOnboardCamera(navigation, { nextRoute: 'OnboardPhoto' })} />
          </View>
        </View>
      : null}

      {path(['data', 0, 'uri'])(cameraCapture) ?
        <>
          <ModalPreviewComponent
            post={{
              image: {
                url64p: path(['data', 0, 'uri'])(cameraCapture),
                url1080p: path(['data', 0, 'uri'])(cameraCapture),
              },
            }}
          />

          <View style={styling.content}>
            <Subheading style={styling.subheading}>{t('You are all setup! Start with uploading your first photo.')}</Subheading>

            <View style={styling.action}>
              <DefaultButton label={t('Upload this photo')} onPress={() => postsCreateRequest({ images: [path(['data', 0, 'uri'])(cameraCapture)] })} />
            </View>

            <View style={styling.action}>
              <DefaultButton label={t('Retake')} onPress={handleRetake} mode="outlined" />
            </View>
          </View>
        </>
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 48,
    justifyContent: 'center',
  },
  action: {
    justifyContent: 'center',
    paddingVertical: 12,
  },
  subheading: {
    textAlign: 'center',
  },
})

OnboardPhoto.propTypes = {
  theme: PropTypes.any,
}

export default withTranslation()(withTheme(OnboardPhoto))
