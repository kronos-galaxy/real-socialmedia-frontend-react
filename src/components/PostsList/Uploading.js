import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Text, Caption } from 'react-native-paper'
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'
import TickIcon from 'assets/svg/post/Tick'
import RefreshIcon from 'assets/svg/post/Refresh'
import VerificationIcon from 'assets/svg/post/Verification'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Uploading = ({
  theme,
  navigation,
  post,
  postsCreateRequest,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  if (!['loading', 'failure', 'success'].includes(post.status)) {
    return null
  }

  return (
    <View style={styling.header}>
      <Avatar
        active={false}
        thumbnailSource={{ uri: path(['payload', 'images', '0'])(post) }}
        imageSource={{ uri: path(['payload', 'images', '0'])(post) }}
      />

      {post.status === 'loading' ?
        <View style={styling.status}>
          <View style={styling.content}>
            <Text style={styling.title}>Uploading {post.meta.progress || 0}%</Text>
            <Caption style={styling.subtitle}>{t('Pending Verification')}</Caption>
          </View>
          <TouchableOpacity style={styling.icon} onPress={() => navigation.navigate('Verification')}>
            <VerificationIcon fill="#ffffff" />
          </TouchableOpacity>
        </View>
      : null}

      {post.status === 'failure' ?
        <TouchableOpacity style={styling.status} onPress={() => postsCreateRequest(post.payload)}>
          <View style={styling.content}>
            <Text style={styling.title}>Reupload</Text>
            <Caption style={styling.subtitle}>{t('Failed to create your post')}</Caption>
          </View>
          <View style={styling.icon}>
            <RefreshIcon fill="#ffffff" />
          </View>
        </TouchableOpacity>
      : null}
      
      {post.status === 'success' ?
        <View style={styling.status}>
          <View style={styling.content}>
            <Text style={styling.title}>Done</Text>
            <Caption style={styling.subtitle}>{t('Successfuly created')}</Caption>
          </View>
          <View style={styling.icon}>
            <TickIcon fill="#ffffff" />
          </View>
        </View>
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.base,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
    width: 38,
  },
  title: {
  },
  subtitle: {
    color: '#676767',
  },
})

Uploading.propTypes = {
  theme: PropTypes.any,
  navigation: PropTypes.any,
  authUser: PropTypes.any,
  post: PropTypes.any,
  handleEditPress: PropTypes.any,
  postsArchiveRequest: PropTypes.any,
  postsFlagRequest: PropTypes.any,
  postsDeleteRequest: PropTypes.any,
}

export default withNavigation(
  withTheme(Uploading)
)
