import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import AlbumsGridComponent from 'components/AlbumsGrid'
import AlbumsGridServiceComponent from 'components/AlbumsGrid/index.service'
import path from 'ramda/src/path'
import PostsLoadingComponent from 'components/PostsList/PostsLoading'
import { initializePriorityQueue } from 'components/Cache/Fetch'

import { withTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const priorityQueueInstance = initializePriorityQueue()

const ProfileAlbums = ({
  t,
  theme,
}) => {
  const styling = styles(theme)
  
  return (
    <AlbumsGridServiceComponent>
      {(albumsProps) => (
        <View style={styling.root}>
          <AlbumsGridComponent
            albumsGet={albumsProps.albumsGet}
            themeFetch={albumsProps.themeFetch}
            themeCode={path(['data', 'themeCode'])(albumsProps.user)}
            priorityQueueInstance={priorityQueueInstance}
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

export default withTranslation()(withTheme(ProfileAlbums))
