import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Subheading, Paragraph } from 'react-native-paper'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const ProfileAbout = ({
  theme,
  usersGetProfile,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <Subheading style={styling.itemTitle}>{path(['data', 'fullName'])(usersGetProfile)}</Subheading>
      <Paragraph style={styling.itemText}>{path(['data', 'bio'])(usersGetProfile)}</Paragraph>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  itemTitle: {
  },
  itemText: {
  },
})

ProfileAbout.propTypes = {
  theme: PropTypes.any,
  usersGetProfile: PropTypes.any,
}

export default withTheme(ProfileAbout)
