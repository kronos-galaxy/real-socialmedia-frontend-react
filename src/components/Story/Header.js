import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'
import dayjs from 'dayjs'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Header = ({
  theme,
  story,
  usersGetProfile,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={styling.action}>
        <Avatar
          size="small"
          thumbnailSource={{ uri: path(['data', 'photoUrl64p'])(usersGetProfile) }}
          imageSource={{ uri: path(['data', 'photoUrl64p'])(usersGetProfile) }}
        />

        <View style={styling.text}>
          <Text style={styling.user}>{path(['data', 'username'])(usersGetProfile)}</Text>
          <Text style={styling.date}>{dayjs(story.postedAt).from(dayjs())}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    marginLeft: 6,
  },
  date: {
    marginLeft: 12,
  },
})

Header.propTypes = {
  theme: PropTypes.any,
  story: PropTypes.any,
}

export default withNavigation(
  withTheme(Header)
)
