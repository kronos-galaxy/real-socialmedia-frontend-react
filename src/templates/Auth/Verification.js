import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import FeatureComponent from 'templates/Feature'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Photo = ({
  t,
  theme,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <View>
        <FeatureComponent active>{t('The Photo must be')} <Text style={styling.strong}>{t('uncropped')}</Text></FeatureComponent>
        <FeatureComponent active>{t('The Photo must be')} <Text style={styling.strong}>{t('unrotated')}</Text></FeatureComponent>
        <FeatureComponent active>{t('The Photo must have been')} <Text style={styling.strong}>{t('taken on this phone')}</Text> {t('(not sent to you)')}</FeatureComponent>
        <FeatureComponent active>{t('If you’re still having trouble, photos taken using the camera inside the REAL app will always pass verification')}</FeatureComponent>
        <FeatureComponent active>{t('Unverified posts can’t be trending/discovered, used as profile pictures, or used in dating. They can only be seen by your followers')}</FeatureComponent>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    marginBottom: 24,
  },
  strong: {
    fontWeight: '600',
  },
})

Photo.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
}

export default withTranslation()(withTheme(Photo))
