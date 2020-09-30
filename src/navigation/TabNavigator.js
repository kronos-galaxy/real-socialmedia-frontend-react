/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { withTheme } from 'react-native-paper'

import { ThemeContext } from 'services/providers/Theme'
import { AuthContext } from 'services/providers/Auth'
import * as navigationOptions from 'navigation/options'
import * as navigationActions from 'navigation/actions'

import FeedNavigator from 'navigation/Feed'
import SearchNavigator from 'navigation/Search'
import ProfileNavigator from 'navigation/Profile'

import HomeIcon from 'assets/svg/footer/Home'
import SearchIcon from 'assets/svg/footer/Search'
import CreateIcon from 'assets/svg/footer/Create'
import DirectIcon from 'assets/svg/footer/Direct'
import UserIcon from 'assets/svg/footer/User'
import testIDs from './test-ids'

const TabNavigator = ({ navigation, route }) => {
  const { theme, themes } = useContext(ThemeContext)
  const { user } = useContext(AuthContext)
  const tabNavigatorProps = navigationOptions.tabNavigatorProps({ theme, themes, route })

  const FeedTabIconComponent = ({ color }) => <HomeIcon fill={color} />
  const feedTabScreenPropsCard = {
    options: {
      tabBarIcon: FeedTabIconComponent,
      tabBarLabel: 'Home',
    },
  }
  
  const SearchTabIconComponent = ({ color }) => <SearchIcon fill={color} />
  const searchTabScreenPropsCard = {
    options: {
      tabBarIcon: SearchTabIconComponent,
      tabBarLabel: 'Explore',
    },
  }

  const CameraTabIconComponent = ({ color }) => <CreateIcon fill={color} />
  const CameraTabButtonComponent = (props) => <TouchableOpacity {...props} onPress={navigationActions.navigatePostType(navigation, { actionType: 'HOME' }, { protected: true, user })} />
  const cameraTabScreenPropsCard = {
    options: {
      tabBarIcon: CameraTabIconComponent,
      tabBarLabel: 'Create',
      tabBarButton: CameraTabButtonComponent,
    },
  }

  const ChatTabIconComponent = ({ color }) => <DirectIcon fill={color} />
  const ChatTabButtonComponent = (props) => <TouchableOpacity {...props} onPress={navigationActions.navigateChat(navigation, {}, { protected: true, user })} />
  const datingTabScreenPropsCard = {
    options: {
      tabBarIcon: ChatTabIconComponent,
      tabBarLabel: 'Chat',
      tabBarButton: ChatTabButtonComponent,
    },
  }

  const ProfileTabIconComponent = ({ color }) => <UserIcon fill={color} />
  const ProfileTabButtonComponent = (props) => <TouchableOpacity {...props} onPress={navigationActions.navigateProfileSelf(navigation, {}, { protected: true, user })} />
  const profileTabScreenPropsCard = {
    options: {
      tabBarIcon: ProfileTabIconComponent,
      tabBarLabel: 'Profile',
      tabBarButton: ProfileTabButtonComponent,
      tabBarTestID: testIDs.tabNavigator.profile,
    },
  }

  const Tab = createBottomTabNavigator()

  const PostType = () => null
  const ChatPlaceholder = () => null

  return (
    <Tab.Navigator {...tabNavigatorProps}>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        {...feedTabScreenPropsCard}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
        {...searchTabScreenPropsCard}
      />
      <Tab.Screen
        name="PostType"
        component={PostType}
        {...cameraTabScreenPropsCard}
      />
      <Tab.Screen
        name="ChatPlaceholder"
        component={ChatPlaceholder}
        {...datingTabScreenPropsCard}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        {...profileTabScreenPropsCard}
      />
    </Tab.Navigator>
  )
}

export default withTheme(TabNavigator)