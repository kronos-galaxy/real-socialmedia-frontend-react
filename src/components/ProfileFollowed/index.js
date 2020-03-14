import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import ResultComponent from 'components/Search/Result'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ProfileFollowed = ({
  t,
  theme,
  usersGetFollowedUsers,
  usersFollow,
  usersFollowRequest,
  usersUnfollow,
  usersUnfollowRequest,
  usersAcceptFollowerUser,
  usersAcceptFollowerUserRequest,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <ResultComponent
        usersSearch={usersGetFollowedUsers}
        usersFollow={usersFollow}
        usersFollowRequest={usersFollowRequest}
        usersUnfollow={usersUnfollow}
        usersUnfollowRequest={usersUnfollowRequest}
        usersAcceptFollowerUser={usersAcceptFollowerUser}
        usersAcceptFollowerUserRequest={usersAcceptFollowerUserRequest}
        loading={usersGetFollowedUsers.status === 'loading'}
      />
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

ProfileFollowed.propTypes = {
  theme: PropTypes.any,
  usersGetFollowedUsers: PropTypes.any,
  usersFollow: PropTypes.any,
  usersFollowRequest: PropTypes.any,
  usersUnfollow: PropTypes.any,
  usersUnfollowRequest: PropTypes.any,
}

export default withTranslation()(withTheme(ProfileFollowed))
