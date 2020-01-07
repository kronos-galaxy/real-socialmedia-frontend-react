import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import ProfileEditForm from 'components/ProfileEdit/Form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const ProfileEdit = ({
  theme,
  initialValues,
  usersEditProfile,
  usersEditProfileRequest,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <KeyboardAwareScrollView>
        <View style={styling.form}>
          <ProfileEditForm
            initialValues={initialValues}
            usersEditProfile={usersEditProfile}
            usersEditProfileRequest={usersEditProfileRequest}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  form: {
    padding: theme.spacing.base,
  },
})

ProfileEdit.propTypes = {
  theme: PropTypes.any,
  initialValues: PropTypes.any,
  usersEditProfile: PropTypes.any,
  usersEditProfileRequest: PropTypes.any,
}

export default withNavigation(
  withTheme(ProfileEdit)
)
