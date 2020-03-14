import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import Layout from 'constants/Layout'
import pathOr from 'ramda/src/pathOr'
import { StaticCollage } from 'react-native-images-collage'
import LinearGradient from 'react-native-linear-gradient'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const AlbumLarge = ({
  t,
  theme,
  items,
}) => {
  const styling = styles(theme)

  const getCollageMatrix = (album) => {
    const albumPosts = pathOr([], ['posts', 'items'])(album)
    if (albumPosts.length <= 1) {
      return [1]
    }
    if (albumPosts.length === 2) {
      return [1, 1]
    }
    if (albumPosts.length > 2) {
      return [1, 2]
    }
  }

  const getCollagePhotos = (album) => {
    const albumPosts = pathOr([], ['posts', 'items'])(album)

    if (!albumPosts.length) {
      return [pathOr('', ['art', 'url480p'])(album)]
    }

    return albumPosts.map(post => post.image.url480p)
  }

  return (
    <View style={styling.root}>
      <View style={styling.albums}>
        {/**
         * Albums list
         */}
        {items.map((album, key) => (
          <View key={key}>
            <View key={key} style={styling.albumWrapper}>
              <View style={styling.album}>
                <LinearGradient
                  colors={[`${theme.colors.backgroundPrimary}10`, `${theme.colors.backgroundSecondary}50`]}
                  style={styling.gradient}
                />

                <StaticCollage
                  width={Layout.window.width / 2 - 6}
                  height={Layout.window.width / 2 - 6}
                  images={getCollagePhotos(album)}
                  matrix={getCollageMatrix(album)}
                />
              </View>
            </View>

            <View key={key} style={styling.albumText}>
              <Text style={styling.text}>{pathOr(t('Default Album'), ['name'])(album)}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  albums: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -6,
  },
  albumWrapper: {
    width: Layout.window.width / 2 - 6,
    height: Layout.window.width / 2 - 6,
    padding: 6,
  },
  albumText: {
    padding: 6,
  },
  album: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
  },
  text: {
    color: theme.colors.text,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
})

AlbumLarge.propTypes = {
  theme: PropTypes.any,
  postsSingleGet: PropTypes.any,
  postsShare: PropTypes.any,
  postsShareRequest: PropTypes.any,
}

export default withTranslation()(
  withTheme(AlbumLarge)
)
