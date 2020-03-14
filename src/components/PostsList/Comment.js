import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Text } from 'react-native-paper'
import * as navigationActions from 'navigation/actions'
import pathOr from 'ramda/src/pathOr'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Comment = ({
  t,
  theme,
  post,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={navigationActions.navigateComments(navigation, { post })} style={styling.root}>
      {pathOr(0, ['commentCount'], post) > 3 ?
        <Text style={styling.count}>{t('View all comments')}</Text>
      : null}

      {pathOr([], ['comments', 'items'], post).map((comment, key) => (
        <View style={styling.comment} key={key}>
          <Text><Text style={styling.author}>{pathOr('', ['commentedBy', 'username'])(comment)}</Text> {pathOr('', ['text'])(comment)}</Text>
        </View>
      ))}
    </TouchableOpacity>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    paddingHorizontal: theme.spacing.base,
    marginBottom: 6,
  },
  author: {
    fontWeight: '700',
  },
  comment: {
    marginBottom: 4,
    flex: 1,
  },
  count: {
    paddingVertical: 6,
    opacity: 0.6,
  },
})

Comment.propTypes = {
  theme: PropTypes.any,
}

export default withTranslation()(withTheme(Comment))
