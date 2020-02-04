import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import Layout from 'constants/Layout'
import ImageComponent from 'templates/Image'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const AlbumLarge = ({
  theme,
  items,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

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
                <ImageComponent
                  thumbnailSource={{ uri: path(['url64p'])(album) }}
                  imageSource={{ uri: path(['url480p'])(album) }}
                  priorityIndex={key}
                />
              </View>
            </View>

            <View key={key} style={styling.albumText}>
              <Text style={styling.text}>{path(['name'])(album)}</Text>
              <Text style={styling.text}>{path(['description'])(album)}</Text>
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
})

AlbumLarge.propTypes = {
  theme: PropTypes.any,
  postsSingleGet: PropTypes.any,
  postsShare: PropTypes.any,
  postsShareRequest: PropTypes.any,
}

export default withTheme(AlbumLarge)
