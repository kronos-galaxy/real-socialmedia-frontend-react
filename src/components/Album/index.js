import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native'
import Layout from 'constants/Layout'
import PostsGridComponent from 'components/PostsGrid'
import ModalProfileComponent from 'templates/ModalProfile'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'
import ActionSheet from 'react-native-actionsheet'
import { useHeader } from 'components/Album/header'

import { withTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Album = ({
  t,
  theme,
  user,
  albumsDeleteRequest,
  themeFetch,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  const route = useRoute()
  const album = path(['params', 'album'])(route)
  const actionSheetRef = useRef(null)

  useHeader({
    user,
    album,
    title: 'Edit',
    onPress: () => actionSheetRef.current && actionSheetRef.current.show(),
  })

  return (
    <View style={styling.root}>
      <ScrollView bounces={false}>
        <View style={styling.content}>
          <ModalProfileComponent
            thumbnailSource={{ uri: path(['ownedBy', 'photo', 'url64p'])(album) }}
            imageSource={{ uri: path(['ownedBy', 'photo', 'url480p'])(album) }}
            title={path(['ownedBy', 'username'])(album)}
            subtitle={path(['ownedBy', 'fullName'])(album)}
          />
        </View>

        <View>
          <PostsGridComponent
            postsGet={{ data: album.posts.items }}
            themeFetch={themeFetch}
            themeCode={path(['ownedBy', 'themeCode'])(album)}
            thread="albums"
          />
        </View>
        
        <ActionSheet
          ref={actionSheetRef}
          options={[t('Edit'), t('Remove'), t('Cancel')]}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => {
            if (index === 0) {
              navigationActions.navigateAlbumEdit(navigation, { album })()
            }
            if (index === 1) {
              albumsDeleteRequest({ albumId: album.albumId })
            }
          }}
        />
      </ScrollView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  header: {
    zIndex: 2,
  },
  content: {
    padding: theme.spacing.base,
  },
  headline: {
    fontSize: 20,
    fontWeight: '600',
  },
  bottomSpacing: {
    marginBottom: theme.spacing.base,
  },

  albums: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  albumWrapper: {
    width: Layout.window.width / 2 - 12,
    height: Layout.window.width / 2 - 12,
    padding: 12,
  },
  album: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
})

Album.propTypes = {
  albumsDeleteRequest: PropTypes.any,
  postsSingleGet: PropTypes.any,
  postsShare: PropTypes.any,
  postsShareRequest: PropTypes.any,
  t: PropTypes.any,
  theme: PropTypes.any,
  themeFetch: PropTypes.any,
  user: PropTypes.any,
}

export default withTranslation()(
  withTheme(Album)
)
