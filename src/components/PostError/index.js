import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import AuthHeaderTemplate from 'templates/Auth/Header'
import AuthVerificationTemplate from 'templates/Auth/Verification'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const PostError = ({
  t,
  theme,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View testID="components/PostError" style={styling.root}>
      <View style={styling.component}>
        <AuthHeaderTemplate
          title={t('Verification Criteria')}
          subtitle={t('Add an Unmodified Profile Picture. Our AI detects photoshop and filters')}
        />

        <View style={styling.content}>
          <AuthVerificationTemplate />
        </View>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
  },
  component: {
    paddingHorizontal: 24,
    flex: 1,
  },
  content: {
    flex: 1,
  },
})

PostError.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  handleLibrarySnap: PropTypes.any,
}

export default withTranslation()(withTheme(PostError))
