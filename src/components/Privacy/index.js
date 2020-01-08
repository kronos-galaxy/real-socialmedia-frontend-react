import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import PrivacyForm from 'components/Privacy/Form'
import Disclaimer from 'components/Privacy/Disclaimer'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Privacy = ({
  theme,
  navigation,
  user,
  togglePrivacyStatus,
  toggleFollowCountsHidden,
  toggleLikesDisabled,
  toggleCommentsDisabled,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <ScrollView>
      <View style={styling.root}>
        <PrivacyForm
          user={user}
          togglePrivacyStatus={togglePrivacyStatus}
          toggleFollowCountsHidden={toggleFollowCountsHidden}
          toggleLikesDisabled={toggleLikesDisabled}
          toggleCommentsDisabled={toggleCommentsDisabled}
        />
        <Disclaimer />
      </View>
    </ScrollView>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: theme.spacing.base,
  },
  form: {
    padding: theme.spacing.base,
  },
})

Privacy.propTypes = {
  theme: PropTypes.any,
  navigation: PropTypes.any,
  user: PropTypes.any,
  togglePrivacyStatus: PropTypes.any,
  toggleFollowCountsHidden: PropTypes.any,
}

export default withNavigation(
  withTheme(Privacy)
)
