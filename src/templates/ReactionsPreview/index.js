import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import path from 'ramda/src/path'
import { Text } from 'react-native-paper'
import Avatar from 'templates/Avatar'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const ReactionsPreviewTemplate = ({
  theme,
  post,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={styling.likes}>
        {path(['onymouslyLikedBy', 'items', '0', 'username'])(post) ?
          <View style={styling.profile}>
            <Avatar
              size="micro"
              thumbnailSource={{ uri: path(['onymouslyLikedBy', 'items', '0', 'photoUrl64p'])(post) }}
              imageSource={{ uri: path(['onymouslyLikedBy', 'items', '0', 'photoUrl64p'])(post) }}
            />
          </View>
        : null}

        {path(['onymouslyLikedBy', 'items', '0', 'username'])(post) ?
          <Text style={styling.text}>
            {t('liked first by {{username}}', {
              username: path(['onymouslyLikedBy', 'items', '0', 'username'])(post),
            })}
          </Text>
        : null}
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  profile: {
    marginRight: 8,
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    alignItems: 'center',
  },
  strong: {
  },
})

ReactionsPreviewTemplate.defaultProps = {
}

ReactionsPreviewTemplate.propTypes = {
  theme: PropTypes.any,
  children: PropTypes.any,
  post: PropTypes.any,
}

export default withTheme(ReactionsPreviewTemplate)
