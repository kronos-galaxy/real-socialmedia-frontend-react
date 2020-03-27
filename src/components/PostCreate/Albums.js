import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import CacheComponent from 'components/Cache'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Albums = ({
  t,
  theme,
  items,
  albumId,
  setAlbumId,
}) => {
  const styling = styles(theme)

  return (
    <ScrollView horizontal>
      <View style={styling.root} horizontal>
        {items.map((album, key) => (
          <TouchableOpacity style={[styling.album, styling.spacingRight]} key={key} onPress={() => setAlbumId(album.albumId)}>
            <CacheComponent
              images={[
                path(['art', 'url64p'])(album),
                path(['art', 'url480p'])(album),
              ]}
              fallback={path(['art', 'url480p'])(album)}
              priorityIndex={key}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  album: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  spacingRight: {
    marginRight: theme.spacing.base,
  }
})

Albums.propTypes = {
  theme: PropTypes.any,
  items: PropTypes.any,
}

export default withTranslation()(withTheme(Albums))
