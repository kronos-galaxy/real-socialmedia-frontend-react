import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Caption, Headline } from 'react-native-paper'
import path from 'ramda/src/path'
import is from 'ramda/src/is'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const ProfileCounts = ({
  theme,
  navigation,
  usersGetProfile,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const userId = path(['data', 'userId'])(usersGetProfile)

  const handleProfileFollowerPress = () => navigation.navigate({
    routeName: 'ProfileFollower',
    params: { userId },
    key: `ProfileFollower-userId${userId}`,
  })
  const handleProfileFollowedPress = () => navigation.navigate({
    routeName: 'ProfileFollowed',
    params: { userId },
    key: `ProfileFollowed-userId${userId}`,
  })
  
  const followerCount = path(['data', 'followerCount'])(usersGetProfile)
  const followedCount = path(['data', 'followedCount'])(usersGetProfile)

  return (
    <View style={styling.root}>
      <View style={styling.item}>
        <Headline style={styling.itemTitle}>{path(['data', 'postCount'])(usersGetProfile)}</Headline>
        <Caption style={styling.itemText} numberOfLines={1}>{t('Posts')}</Caption>
      </View>
      
      <TouchableOpacity style={styling.item} onPress={handleProfileFollowerPress}>
        {!path(['data', 'followCountsHidden'])(usersGetProfile) && is(Number)(followerCount) ?
          <Headline style={styling.itemTitle}>{followerCount}</Headline>
        :
          <Headline style={styling.itemTitle}>•</Headline>
        }
        <Caption style={styling.itemText} numberOfLines={1}>{t('Followers')}</Caption>
      </TouchableOpacity>

      
      <TouchableOpacity style={styling.item} onPress={handleProfileFollowedPress}>
        {!path(['data', 'followCountsHidden'])(usersGetProfile) && is(Number)(followedCount) ?
          <Headline style={styling.itemTitle}>{followedCount}</Headline>
        :
          <Headline style={styling.itemTitle}>•</Headline>
        }
        <Caption style={styling.itemText} numberOfLines={1}>{t('Following')}</Caption>
      </TouchableOpacity>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    height: 32,
  },
  itemText: {
  },
})

ProfileCounts.propTypes = {
  theme: PropTypes.any,
  navigation: PropTypes.any,
  usersGetProfile: PropTypes.any,
}

export default withNavigation(
  withTheme(ProfileCounts)
)
