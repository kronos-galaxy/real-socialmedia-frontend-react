import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import PostsGridComponent from 'components/PostsGrid'
import PostsGridServiceComponent from 'components/PostsGrid/index.service'
import path from 'ramda/src/path'
import PostsLoadingComponent from 'components/Feed/PostsLoading'

import { withTheme } from 'react-native-paper'

const ProfileFeed = ({
  theme,
}) => {
  const styling = styles(theme)
  
  return (
    <PostsGridServiceComponent postsGetRequestOnMount={true}>
      {(postsProps) => (
        <View style={styling.root}>
          <PostsGridComponent
            postsGet={postsProps.postsGet}
            themeFetch={postsProps.themeFetch}
            themeCode={path(['data', 'themeCode'])(postsProps.user)}
            thread="posts/profile"
          />

          {(path(['status'])(postsProps.postsGet) === 'loading' && !path(['data', 'length'])(postsProps.postsGet)) ?
            <PostsLoadingComponent />
          : null}
        </View>
      )}
    </PostsGridServiceComponent>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

ProfileFeed.propTypes = {
  theme: PropTypes.any,
}

export default withTheme(ProfileFeed)
