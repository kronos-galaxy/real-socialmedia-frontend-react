import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Text } from 'react-native-paper'
import pathOr from 'ramda/src/pathOr'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const FormAlbums = ({
  theme,
  navigation,
  values,
  setFieldValue,
  albumsGet,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const handleAlbumPress = (albumId) => () => {
    setFieldValue('albumId', albumId)
  }

  const handleSeeMore = () => {
    navigation.navigate('Albums')
  }

  return (
    <View style={styling.root}>
      <Text style={styling.text}>{t('Albums')}</Text>

      <ScrollView style={styling.albums} horizontal>
        {pathOr([], ['data'])(albumsGet).map((album, key) => {
          const style = (values.albumId === album.albumId) ?
            [styling.album, styling.albumSelected] :
            [styling.album, styling.albumDefault]

          return (
            <TouchableOpacity style={style} onPress={handleAlbumPress(album.albumId)} key={key}>
              <Text>{album.name}</Text>
            </TouchableOpacity>
          )
        })}

        <TouchableOpacity style={styling.album} onPress={handleSeeMore}>
          <Text>See more</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  text: {
  },
  albums: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  album: {
    padding: 8,
    borderRadius: 4,
    marginRight: theme.spacing.base,
  },
  albumSelected: {
    backgroundColor: theme.colors.primary,
  },
  albumDefault: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
})

FormAlbums.propTypes = {
  theme: PropTypes.any,
  values: PropTypes.any,
  setFieldValue: PropTypes.any,
}

export default withNavigation(
  withTheme(FormAlbums)
)
