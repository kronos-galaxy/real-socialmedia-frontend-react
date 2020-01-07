import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const UserRowActionTemplate = ({
  theme,
  followActive,
  followloading,
  onFollowPress,
  unfollowActive,
  unfollowloading,
  onUnfollowPress,
  requestActive,
  requestloading,
  onRequestedPress,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={styling.component}>
        {followActive ?
          <DefaultButton label={t('Follow')} onPress={onFollowPress} loading={followloading} mode="outlined" size="compact" />
        : null}

        {unfollowActive ?
          <DefaultButton label={t('Unfollow')} onPress={onUnfollowPress} loading={unfollowloading} mode="outlined" size="compact" />
        : null}

        {requestActive ?
          <DefaultButton label={t('Pending')} onPress={onRequestedPress} loading={requestloading} mode="outlined" size="compact" />
        : null}
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  component: {
    width: 90,
  },
  avatar: {
  },
  content: {
  },
  action: {
  },
})

UserRowActionTemplate.defaultProps = {
}

UserRowActionTemplate.propTypes = {
  theme: PropTypes.any,
  followActive: PropTypes.any,
  followloading: PropTypes.any,
  onFollowPress: PropTypes.any,
  unfollowActive: PropTypes.any,
  unfollowloading: PropTypes.any,
  onUnfollowPress: PropTypes.any,
  requestActive: PropTypes.any,
  requestloading: PropTypes.any,
  onRequestedPress: PropTypes.any,
}

export default withTheme(UserRowActionTemplate)
