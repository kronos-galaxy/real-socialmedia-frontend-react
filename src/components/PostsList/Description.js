import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import ReactionsPreviewTemplate from 'templates/ReactionsPreview'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Description = ({
  theme,
  post,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      {!path(['postedBy', 'likesDisabled'])(post) && !post.likesDisabled ?
        <View style={styling.likes}>
          <ReactionsPreviewTemplate
            post={post}
          />
        </View>
      : null}

      {path(['text', 'length'])(post) ?
        <View style={styling.desc}>
          <Text>
            <Text style={styling.username}>{post.postedBy.username}</Text>
            <Text style={styling.text}> {post.text}</Text>
          </Text>
        </View>
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  likes: {
    padding: theme.spacing.base,
    marginBottom: 8,
  },
  desc: {
    padding: theme.spacing.base,
    flexDirection: 'row',
  },
  text: {
    marginLeft: 4,
  },
  username: {
    fontWeight: '700',
  },
})

Description.propTypes = {
  theme: PropTypes.any,
  post: PropTypes.any,
}

export default withTheme(Description)
