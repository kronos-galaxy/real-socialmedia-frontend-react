import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import ResultComponent from 'components/Search/Result'
import ScrollService from 'services/Scroll'
import { Caption } from 'react-native-paper'
import path from 'ramda/src/path'
import ModalProfileComponent from 'templates/ModalProfile'
import ModalPreviewComponent from 'templates/ModalPreview'
import dayjs from 'dayjs'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const PostViews = ({
  t,
  theme,
  postsViewsGet,
  postsViewsGetRequest,
  postsViewsGetMoreRequest,
  usersFollow,
  usersFollowRequest,
  usersUnfollow,
  usersUnfollowRequest,
  usersAcceptFollowerUser,
  usersAcceptFollowerUserRequest,
  postsSingleGet,
}) => {
  const styling = styles(theme)

  const scroll = ScrollService({
    resource: postsViewsGet,
    loadInit: postsViewsGetRequest,
    loadMore: postsViewsGetMoreRequest,
    extra: { postId: path(['data', 'postId'])(postsSingleGet) },
  })
  
  return (
    <View style={styling.root}>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.border}
            refreshing={scroll.refreshing}
          />
        }
        onScroll={scroll.handleScrollChange}
        scrollEventThrottle={400}
      >
        <ModalPreviewComponent
          post={path(['data'])(postsSingleGet)}
        />

        <View style={styling.content}>
          <ModalProfileComponent
            thumbnailSource={{ uri: path(['data', 'postedBy', 'photo', 'url480p'])(postsSingleGet) }}
            imageSource={{ uri: path(['data', 'postedBy', 'photo', 'url480p'])(postsSingleGet) }}
            title={path(['data', 'postedBy', 'username'])(postsSingleGet)}
            subtitle={`${t('Posted')} ${dayjs(path(['data', 'postedAt'])(postsSingleGet)).from(dayjs())}`}
          />
        </View>

        <ResultComponent
          usersSearch={postsViewsGet}
          usersFollow={usersFollow}
          usersFollowRequest={usersFollowRequest}
          usersUnfollow={usersUnfollow}
          usersUnfollowRequest={usersUnfollowRequest}
          usersAcceptFollowerUser={usersAcceptFollowerUser}
          usersAcceptFollowerUserRequest={usersAcceptFollowerUserRequest}
        />

        <View style={styling.info}>
          <Caption>{t('Only you can see who viewed your post')}</Caption>
        </View>

        {scroll.loadingmore ?
          <View style={styling.activity}>
            <ActivityIndicator color={theme.colors.border} />
          </View>
        : null}
      </ScrollView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
  },
  info: {
    paddingHorizontal: theme.spacing.base,
    alignItems: 'center',
  },
  activity: {
    padding: theme.spacing.base * 2,
  },
  content: {
    padding: theme.spacing.base,
  },
})

PostViews.propTypes = {
  theme: PropTypes.any,
  postsViewsGet: PropTypes.any,
  postsViewsGetRequest: PropTypes.any,
  postsViewsGetMoreRequest: PropTypes.any,
  usersFollow: PropTypes.any,
  usersFollowRequest: PropTypes.any,
  usersUnfollow: PropTypes.any,
  usersUnfollowRequest: PropTypes.any,
  t: PropTypes.any,
  usersAcceptFollowerUser: PropTypes.any,
  usersAcceptFollowerUserRequest: PropTypes.any,
  postsSingleGet: PropTypes.any,
}

export default withTranslation()(withTheme(PostViews))
