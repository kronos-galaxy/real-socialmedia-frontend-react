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
  authUser,
  post,
  postsOnymouslyLikeRequest,
  postsDislikeRequest,
  pagination: Pagination,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const self = path(['postedBy', 'userId'])(post) === path(['userId'])(authUser)

  const handleViewsPress = () => {
    if (!self) { return }
    navigation.navigate({
      routeName: 'PostMediaViews',
      params: {
        postId: path(['postId'])(post)
      },
      key: `PostMediaViews-postid${post.postId}`,
    })
  }

  /**
   * See if current authenticated user is tagged in post by author
   */
  const tagged = (path(['textTaggedUsers'])(post) || [])
    .find(textTag => textTag.tag === `@${path(['username'])(authUser)}`)

  /**
   * Visibility of like button, like button will be visible if:
   * - Post owner has enabled likes
   * - Post owner has not enabled likesDisabled global setting
   * - Like hasn't been set before, which allows only 1 like per post
   */
  const likeButtonVisibility = (
    !post.likesDisabled &&
    !path(['postedBy', 'likesDisabled'])(post) &&
    !path(['onymouslyLikedBy', 'items', '0'])(post)
  )

  /**
   * Visibility of comment button, comment button will be visible if:
   * - Post owner has enabled comments
   * - Post owner has not enabled commentsDisabled global setting
   */
  const commentButtonVisibility = (
    !post.commentsDisabled &&
    !path(['postedBy', 'commentsDisabled'])(post)
  )

  /**
   * Visibility of share button, share button will be visible if:
   * - Post owner has enabled shares
   * - Current authenticated user has shares enabled in settings
   * - Current authenticated user is tagged in post by author
   */
  const shareButtonVisibility = (
    !post.sharingDisabled ||
    tagged
  )

  /**
   * Visibility of seen by text, text will be visible if:
   * - Current authenticated user owns the post
   * - Post has not enabled viewCountsHidden setting
   * - Post owner has not enabled viewCountsHidden global setting
   */
  const seenByVisibility = (
    self &&
    !post.viewCountsHidden &&
    !path(['postedBy', 'viewCountsHidden'])(post)
  )

  return (
    <View style={styling.action}>
      <View style={styling.actionLeft}>

        {likeButtonVisibility && post.likeStatus === 'NOT_LIKED' ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={() => postsOnymouslyLikeRequest({ postId: path(['postId'])(post), userId: path(['postedBy', 'userId'])(post) })}>
            <LikeIcon fill={theme.colors.primaryIcon} />
          </TouchableOpacity>
        : null}

        {likeButtonVisibility && post.likeStatus !== 'NOT_LIKED' ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={() => postsDislikeRequest({ postId: path(['postId'])(post), userId: path(['postedBy', 'userId'])(post) })}>
            <UnlikeIcon fill={theme.colors.primary} />
          </TouchableOpacity>
        : null}
        
        {commentButtonVisibility ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={() => navigation.navigate('Comments', { post })}>
            <BubbleIcon fill={theme.colors.primaryIcon} />
          </TouchableOpacity>
        : null}

        {shareButtonVisibility ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={() => navigation.navigate('PostShare', { post })}>
            <DirectIcon fill={theme.colors.primaryIcon} />
          </TouchableOpacity>
        : null}
      </View>

      <View style={styling.actionCenter}>
        {Pagination}
      </View>

      {seenByVisibility ?
        <TouchableOpacity style={styling.actionRight} onPress={handleViewsPress}>
          <Caption>{t('Seen by {{viewedByCount}} people', { viewedByCount: post.viewedByCount })}</Caption>
        </TouchableOpacity>
      :
        <View style={styling.actionRight}>
          <Caption>{dayjs(post.postedAt).from(dayjs())}</Caption>
        </View>
      }
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
    flex: 1,
    flexDirection: 'row',
  },
  actionCenter: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  actionRight: {
    flex: 1,
    flexDirection: 'row-reverse',
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
