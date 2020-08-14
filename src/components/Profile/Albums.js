import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import AlbumsGridComponent from 'components/AlbumsGrid'
import AlbumsGridServiceComponent from 'components/AlbumsGrid/index.service'
import path from 'ramda/src/path'
import PostsLoadingComponent from 'components/Feed/PostsLoading'

import { withTheme } from 'react-native-paper'

const ProfileAlbums = ({
  theme,
}) => {
  const styling = styles(theme)
  
  return (
    <AlbumsGridServiceComponent albumsGetRequestOnMount={true}>
      {(albumsProps) => (
        <View style={styling.root}>
          <AlbumsGridComponent
            albumsGet={albumsProps.albumsGet}
            themeFetch={albumsProps.themeFetch}
            themeCode={path(['data', 'themeCode'])(albumsProps.user)}
          />

          {(path(['status'])(albumsProps.albumsGet) === 'loading' && !path(['data', 'length'])(albumsProps.albumsGet)) ?
            <PostsLoadingComponent />
          : null}
        </View>
      )}
    </AlbumsGridServiceComponent>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

ProfileAlbums.propTypes = {
  theme: PropTypes.any,
}

export default withTheme(ProfileAlbums)
