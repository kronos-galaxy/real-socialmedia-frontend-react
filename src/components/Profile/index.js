import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native'
import CountsComponent from 'components/Profile/Counts'
import AboutComponent from 'components/Profile/About'
import ActionComponent from 'components/Profile/Action'
import ProfileStatusComponent from 'components/Profile/Status'
import ProfileTabViewComponent from 'components/Profile/ProfileTabView'

import Avatar from 'templates/Avatar'
import NativeError from 'templates/NativeError'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'

import { withTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const PostsScrollHelper = ({
  userId,
  postsGet,
  postsGetRequest,
  postsGetMoreRequest,
}) => {
  const handleLoadMore = () => {
    if (
      refreshing ||
      !path(['data', 'length'])(postsGet) ||
      !path(['meta', 'nextToken'])(postsGet) ||
      path(['meta', 'nextToken'])(postsGet) === path(['payload', 'nextToken'])(postsGet)
    ) { return }
    postsGetMoreRequest({ nextToken: path(['meta', 'nextToken'])(postsGet) })
  }

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) =>
    layoutMeasurement.height + contentOffset.y >= contentSize.height - 160

  const handleScrollChange = ({ nativeEvent }) => {
    if (isCloseToBottom(nativeEvent)) {
      handleLoadMore()
    }
  }
  
  const refreshing = (
    postsGet.status === 'loading'
  )
  
  const loadingmore = (
    postsGet.status === 'loading'
  )

  const handleRefresh = () => {
    postsGetRequest({ userId })
  }

  return {
    handleScrollChange,
    loadingmore,
    handleRefresh,
    refreshing,
  }
}

const Profile = ({
  theme,
  profileRef,

  authUser,
  usersBlock,
  usersGetProfile,

  postsGet,
  postsGetRequest,
  postsGetMoreRequest,
  
  albumsGet,
  albumsGetRequest,
  albumsGetMoreRequest,

  usersBlockRequest,
  usersUnblock,
  usersUnblockRequest,
  usersFollow,
  usersFollowRequest,
  usersUnfollow,
  usersUnfollowRequest,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'feed', title: 'Feed' },
    { key: 'albums', title: 'Albums' },
  ])

  const handleUserStoryPress = () => {
    if (!pathOr(0, ['data', 'stories', 'items', 'length'], usersGetProfile)) {
      return
    }

    navigation.push('Story', {
      user: usersGetProfile.data,
      usersGetFollowedUsersWithStories: { data: [usersGetProfile.data] },
    })
  }

  const scroll = PostsScrollHelper({
    userId: path(['data', 'userId'])(usersGetProfile),
    postsGet,
    postsGetRequest,
    postsGetMoreRequest,
  })

  const self = path(['data', 'userId'])(usersGetProfile) === path(['userId'])(authUser)

  return (
    <ScrollView
      ref={profileRef}
      style={styling.root}
      onScroll={scroll.handleScrollChange}
      scrollEventThrottle={400}
      refreshControl={(
        <RefreshControl
          tintColor={theme.colors.border}
          onRefresh={scroll.handleRefresh}
          refreshing={scroll.refreshing}
        />
      )}
    >
      <NativeError
        handleCancelPress={() => {}}
        titleText={t('All good!')}
        messageText={t('User is blocked and will not have an access to your posts')}
        actionText={t('Done')}
        status={path(['status'])(usersBlock)}
        triggerOn="success"
      />

      {route.name === 'ProfileSelf' ?
        <ProfileStatusComponent />
      : null}

      <View style={styling.component}>
        <TouchableOpacity style={styling.image} onPress={handleUserStoryPress}>
          <Avatar
            size="large"
            active
            thumbnailSource={{ uri: path(['data', 'photo', 'url64p'])(usersGetProfile) }}
            imageSource={{ uri: path(['data', 'photo', 'url480p'])(usersGetProfile) }}
            themeCode={path(['data', 'themeCode'])(usersGetProfile)}
          />
        </TouchableOpacity>
        <View style={styling.counts}>
          <CountsComponent
            usersGetProfile={usersGetProfile}
          />
        </View>
      </View>

      <View style={styling.about}>
        <AboutComponent
          authUser={authUser}
          usersGetProfile={usersGetProfile}
        />
      </View>

      <View style={styling.action}>
        <ActionComponent
          self={self}
          usersGetProfile={usersGetProfile}
          usersBlock={usersBlock}
          usersBlockRequest={usersBlockRequest}
          usersUnblock={usersUnblock}
          usersUnblockRequest={usersUnblockRequest}
          usersFollow={usersFollow}
          usersFollowRequest={usersFollowRequest}
          usersUnfollow={usersUnfollow}
          usersUnfollowRequest={usersUnfollowRequest}
        />
      </View>

      <ProfileTabViewComponent
        index={index}
        setIndex={setIndex}
        routes={routes}
      />
    </ScrollView>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  image: {
    paddingRight: 12,
  },
  counts: {
    flex: 1,
  },
  about: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
})

Profile.propTypes = {
  theme: PropTypes.any,
  usersGetProfile: PropTypes.any,
  authUser: PropTypes.any,
  usersBlock: PropTypes.any,
  usersBlockRequest: PropTypes.any,
  usersUnblock: PropTypes.any,
  usersUnblockRequest: PropTypes.any,
  usersFollow: PropTypes.any,
  usersFollowRequest: PropTypes.any,
  usersUnfollow: PropTypes.any,
  usersUnfollowRequest: PropTypes.any,
  postsGet: PropTypes.any,
}

export default withTheme(Profile)
