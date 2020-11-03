/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { ThemeContext } from 'services/providers/Theme'
import { AuthContext } from 'services/providers/Auth'
import * as navigationOptions from 'navigation/options'
import * as navigationActions from 'navigation/actions'
import * as postsActions from 'store/ducks/posts/actions'

import FeedNavigator from 'navigation/Feed'
import SearchNavigator from 'navigation/Search'
import DatingNavigator from 'navigation/Dating'
import ProfileNavigator from 'navigation/Profile'

import HomeIcon from 'assets/svg/footer/Home'
import SearchIcon from 'assets/svg/footer/Search'
import CreateIcon from 'assets/svg/footer/Create'
import DatingIcon from 'assets/svg/footer/Dating'
import UserIcon from 'assets/svg/footer/User'
import testIDs from './test-ids'

const Tab = createBottomTabNavigator()

const TabNavigator = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { theme } = useContext(ThemeContext)
  const { user } = useContext(AuthContext)
  const tabNavigatorProps = navigationOptions.tabNavigatorProps({ theme, route })

  const FeedTabIconComponent = ({ color }) => <HomeIcon fill={color} />
  const feedTabScreenPropsCard = {
    options: {
      tabBarIcon: FeedTabIconComponent,
      tabBarLabel: 'Home',
    },
  }
  
  const handleSearchPress = (props) => () => { 
    props.onPress()

    setTimeout(() => {
      dispatch(postsActions.postsGetTrendingPostsRequest())
    }, 300)
  }
  const SearchTabIconComponent = ({ color }) => <SearchIcon fill={color} />
  const SearchTabButtonComponent = (props) => <TouchableOpacity {...props} onPress={handleSearchPress(props)} />
  const searchTabScreenPropsCard = {
    options: {
      tabBarIcon: SearchTabIconComponent,
      tabBarLabel: 'Explore',
      tabBarButton: SearchTabButtonComponent,
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

  const DatingTabIconComponent = ({ color }) => <DatingIcon fill={color} />
  const DatingTabButtonComponent = (props) => <TouchableOpacity {...props} onPress={navigationActions.navigateDating(navigation, {}, { protected: true, user })} />
  const datingTabScreenPropsCard = {
    options: {
      tabBarIcon: DatingTabIconComponent,
      tabBarLabel: 'Dating',
      tabBarButton: DatingTabButtonComponent,
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

  const PostType = () => null

  return (
    <Tab.Navigator {...tabNavigatorProps} initialRouteName="Search">
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
        name="Dating"
        component={DatingNavigator}
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

export default TabNavigator