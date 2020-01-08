import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import BubbleIcon from 'assets/svg/action/Bubble'
import DirectIcon from 'assets/svg/action/Direct'
import LikeIcon from 'assets/svg/action/Like'
import UnlikeIcon from 'assets/svg/action/Unlike'
import path from 'ramda/src/path'
import { Caption } from 'react-native-paper'
import dayjs from 'dayjs'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Action = ({
  theme,
  navigation,
  post,
  postsOnymouslyLikeRequest,
  postsDislikeRequest,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const handleCommentPress = () => navigation.navigate('Modal', ({
    cancelAction: () => navigation.goBack(null),
    cancelLabel: t('Cancel'),
    confirmLabel: t('OK'),
    confirmAction: () => navigation.goBack(null),
    text: `${t('REAL is fully Open Source & built by the people')}. ${t('Help us move faster by contributing code')}.`,
    title: t('Comments Coming Soon'),
  }))

  return (
    <View style={styling.action}>
      <View style={styling.actionLeft}>

        {!path(['postedBy', 'likesDisabled'])(post) && !post.likesDisabled && post.likeStatus === 'NOT_LIKED' ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={() => postsOnymouslyLikeRequest({ postId: path(['postId'])(post), userId: path(['postedBy', 'userId'])(post) })}>
            <LikeIcon fill={theme.colors.primaryIcon} />
          </TouchableOpacity>
        : null}

        {!path(['postedBy', 'likesDisabled'])(post) && !post.likesDisabled && post.likeStatus !== 'NOT_LIKED' ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={() => postsDislikeRequest({ postId: path(['postId'])(post), userId: path(['postedBy', 'userId'])(post) })}>
            <UnlikeIcon fill={theme.colors.primary} />
          </TouchableOpacity>
        : null}
        
        {!post.commentsDisabled && !path(['postedBy', 'commentsDisabled'])(post) ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={handleCommentPress}>
            <BubbleIcon fill={theme.colors.primaryIcon} />
          </TouchableOpacity>
        : null}

        <TouchableOpacity style={styling.actionLeftIcon} onPress={() => navigation.navigate('PostShare', { post })}>
          <DirectIcon fill={theme.colors.primaryIcon} />
        </TouchableOpacity>
      </View>
      <View style={styling.actionRight}>
        <View style={styling.time}>
          <Caption style={styling.timeAgo}>{dayjs(post.postedAt).from(dayjs())}</Caption>
        </View>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  action: {
    flexDirection: 'row',
    padding: theme.spacing.base,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionLeftIcon: {
    marginRight: 18,
  },
  actionLeft: {
    flexDirection: 'row',
  },
  actionRight: {
    flexDirection: 'row',
  },
  time: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  timeAgo: {
  },
})

Action.propTypes = {
  theme: PropTypes.any,
  navigation: PropTypes.any,
  post: PropTypes.any,
  postsOnymouslyLikeRequest: PropTypes.any,
  postsDislikeRequest: PropTypes.any,
}

export default withNavigation(
  withTheme(Action)
)
