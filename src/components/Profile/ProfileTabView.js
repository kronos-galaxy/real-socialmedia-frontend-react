import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native'
import FeedComponent from 'components/Profile/Feed'
import AlbumsComponent from 'components/Profile/Albums'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'

const renderScene = SceneMap({
  feed: FeedComponent,
  albums: AlbumsComponent,
})

const ProfileTabView = ({
  theme,
  index,
  setIndex,
  routes,
  styling,
}) => {
  const renderLabel = useCallback(({ route }) => (
    <Text style={styling.label}>
      {route.title}
    </Text>
  ), [])

  const renderTabBar = useCallback(props => (
    <TabBar
      {...props}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.text}
      indicatorStyle={styling.indicator}
      style={styling.tabbar}
      renderLabel={renderLabel}
    />
  ), [])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={styling.initial}
      indicatorStyle={styling.tabbar}
      renderTabBar={renderTabBar}
    />
  )
}

const Profile = ({
  theme,
}) => {
  const styling = styles(theme)

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'feed', title: 'Feed' },
    { key: 'albums', title: 'Albums' },
  ])
  
  return (
    <View style={styling.root}>
      <ProfileTabView
        theme={theme}
        index={index}
        setIndex={setIndex}
        routes={routes}
        styling={styling}
      />
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  tabbar: {
    backgroundColor: 'transparent',
  },
  indicator: {
    backgroundColor: theme.colors.primary,
  },
  label: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
    margin: 8,
  },
  initial: {
    width: Dimensions.get('window').width,
  },
})

Profile.propTypes = {
  theme: PropTypes.any,
  index: PropTypes.any,
  setIndex: PropTypes.any,
  routes: PropTypes.any,
}

ProfileTabView.propTypes = {
  theme: PropTypes.any,
  index: PropTypes.any,
  setIndex: PropTypes.any,
  routes: PropTypes.any,
  styling: PropTypes.any,
}

export default withTheme(Profile)
