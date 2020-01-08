import React, { useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import path from 'ramda/src/path'
import HeaderComponent from 'components/PostsList/Header'
import ActionComponent from 'components/PostsList/Action'
import DescriptionComponent from 'components/PostsList/Description'
import ListItemComponent from 'templates/ListItem'
import ImageComponent from 'templates/Image'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const PostComponent = ({
  theme,
  navigation,
  authUser,
  post,
  postsShareRequest,
  handleEditPress,
  postsArchiveRequest,
  postsFlagRequest,
  postsDeleteRequest,
  postsAnonymouslyLikeRequest,
  postsOnymouslyLikeRequest,
  postsDislikeRequest,
  handleProfilePress,
  postsRestoreArchivedRequest,
  onMeasure,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const ref = useRef(null)

  const handleLayoutChange = useCallback(() => {
    if (!['Feed', 'PostMedia'].includes(navigation.state.routeName)) { return }
    ref.current.measure((fx, fy, width, height, px, py) => {
      onMeasure({ postId: post.postId, measure: { fx, fy, width, height, px, py } })
    })
  }, [])

  return (
    <View style={styling.root} onLayout={handleLayoutChange} ref={ref}>
      <HeaderComponent
        authUser={authUser}
        post={post}
        handleEditPress={handleEditPress}
        postsArchiveRequest={postsArchiveRequest}
        postsFlagRequest={postsFlagRequest}
        postsDeleteRequest={postsDeleteRequest}
        postsShareRequest={postsShareRequest}
        handleProfilePress={handleProfilePress}
        postsRestoreArchivedRequest={postsRestoreArchivedRequest}
      />
      <ListItemComponent post={post}>
        <ImageComponent
          thumbnailSource={{ uri: path(['mediaObjects', '0', 'url64p'])(post) }}
          imageSource={{ uri: path(['mediaObjects', '0', 'url4k'])(post) }}
        />
      </ListItemComponent>
      <ActionComponent
        post={post}
        postsShareRequest={postsShareRequest}
        postsAnonymouslyLikeRequest={postsAnonymouslyLikeRequest}
        postsOnymouslyLikeRequest={postsOnymouslyLikeRequest}
        postsDislikeRequest={postsDislikeRequest}
      />
      <DescriptionComponent
        post={post}
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

PostComponent.defaultProps = {
  postsGet: {},
}

PostComponent.propTypes = {
  theme: PropTypes.any,
  authUser: PropTypes.any,
  feedRef: PropTypes.any,
  postsFeedGet: PropTypes.any,
  postsFeedGetRequest: PropTypes.any,
  usersStoriesGet: PropTypes.any,
  usersStoriesGetRequest: PropTypes.any,
  postsShareRequest: PropTypes.any,
  handleEditPress: PropTypes.any,
  postsArchiveRequest: PropTypes.any,
  postsFlag: PropTypes.any,
  postsFlagRequest: PropTypes.any,
  postsDeleteRequest: PropTypes.any,
  postsAnonymouslyLikeRequest: PropTypes.any,
  postsOnymouslyLikeRequest: PropTypes.any,
  postsDislikeRequest: PropTypes.any,
  usersGetFollowedUsersWithStories: PropTypes.any,
  usersGetFollowedUsersWithStoriesRequest: PropTypes.any, 
}

export default withNavigation(
  withTheme(PostComponent)
)
