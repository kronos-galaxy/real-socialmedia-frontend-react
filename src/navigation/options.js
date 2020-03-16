import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { HeaderStyleInterpolators, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack'
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter'

import * as navigationActions from 'navigation/actions'
import path from 'ramda/src/path'
import Layout from 'constants/Layout'

import LogoIcon from 'assets/svg/header/Logo'
import CameraIcon from 'assets/svg/header/Camera'
import DirectIcon from 'assets/svg/header/Direct'
import BackIcon from 'assets/svg/header/Back'

const pageHeaderLeft = ({ onPress, label, labelStyle }) => {
  if (!onPress) { return null }
  return (
    <TouchableOpacity style={{ paddingHorizontal: 12 }} onPress={onPress}>
      <BackIcon fill="#fff" />
    </TouchableOpacity>
  )
}

const homeHeaderLeft = ({ theme, navigation }) => () => (
  <TouchableOpacity style={{ padding: 12 }} onPress={navigationActions.navigateCamera(navigation)}>
    <CameraIcon
      fill={theme.colors.primaryIcon}
    />
  </TouchableOpacity>
)

const homeHeaderTitle = ({ theme }) => () => (
  <LogoIcon
    height="28"
    fill={theme.colors.primaryIcon}
  />
)

const homeHeaderRight = ({ theme, navigation }) => () => (
  <TouchableOpacity style={{ padding: 12 }} onPress={navigationActions.navigateChat(navigation)}>
    <DirectIcon
      fill={theme.colors.primaryIcon}
    />
  </TouchableOpacity>
)

const AuthNavigationComponent = ({ navigation, theme }) => ({
  headerStyle: {
    backgroundColor: theme.colors.backgroundPrimary,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
  headerLeft: pageHeaderLeft,
  headerTitle: homeHeaderTitle({ navigation, theme }),
})

const HomeNavigationComponent = ({ navigation, theme }) => ({
  headerStyle: {
    backgroundColor: theme.colors.backgroundPrimary,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
  headerLeft: homeHeaderLeft({ navigation, theme }),
  headerTitle: homeHeaderTitle({ navigation, theme }),
  headerRight: homeHeaderRight({ navigation, theme }),
})

/**
 * Recursive search for the latest active screen in the stack
 * useful for getting active users theme object
 */
export const getActiveRouteName = (item) => {
  const index = path(['state', 'index'])(item)
  const nextRoute = path(['state', 'routes', index])(item)

  if (nextRoute && nextRoute.state) {
    return getActiveRouteName(nextRoute)
  } else if (nextRoute) {
    return nextRoute
  } else {
    return item
  }
}

const getActiveTheme = ({ theme, themes, route }) => {
  const themeSelector = (themeCode) =>
    ((themes || []).find(theme => theme.key === themeCode) || {}).theme

  if (!['Profile', 'ProfileFollower', 'ProfileFollowed', 'PostMedia'].includes(route.name)) {
    return theme
  }

  const userTheme = path(['params', 'user', 'themeCode'])(route)
  if (userTheme) {
    return themeSelector(userTheme)
  }

  const postTheme = path(['params', 'post', 'postedBy', 'themeCode'])(route)
  if (postTheme) {
    return themeSelector(postTheme)
  }

  return theme
}

const pager = props => {
  const currentIndex = path(['navigationState', 'index'])(props)
  const nextIndex = path(['navigationState', 'routes', currentIndex, 'state', 'index'])(props)
  const swipeEnabled = !nextIndex || nextIndex === 0
  return (
    <ViewPagerAdapter {...props} swipeEnabled={swipeEnabled} />
  )
}

export const tabNavigatorDefaultProps = () => ({
  initialRouteName: 'Root',
  tabBar: () => null,
  lazy: true,
  sceneContainerStyle: {
    backgroundColor: 'transparent',
  },
  pager,
})

export const stackNavigatorDefaultProps = ({ theme }) => ({
  screenOptions: {
    headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
  },
  cardStyle: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
  gestureEnabled: 'vertical',
})

export const stackNavigatorCardProps = ({ theme }) => ({
  screenOptions: {
    gestureEnabled: true,
    cardOverlayEnabled: true,
    ...TransitionPresets.ModalPresentationIOS,
  },
  cardStyle: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
  mode: 'modal',
})

/**
 * Used for Main Screens with application logo
 */
export const stackScreenDefaultProps = ({ theme }) => ({
  options: (props) => ({
    ...HomeNavigationComponent({ ...props, theme }),
    gestureResponseDistance: {
      horizontal: Layout.window.width,
      vertical: Layout.window.height,
    },
    cardStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
  }),
})

/**
 * Used for Main Screens with application logo
 */
export const stackScreenAuthProps = ({ theme }) => ({
  options: (props) => ({
    ...AuthNavigationComponent({ ...props, theme }),
    gestureResponseDistance: {
      horizontal: Layout.window.width,
      vertical: Layout.window.height,
    },
    cardStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
  }),
})

/**
 * Used for Camera without header
 */
export const stackScreenBlankProps = ({ theme }) => ({
  options: (props) => ({
    gestureResponseDistance: {
      horizontal: Layout.window.width,
      vertical: Layout.window.height,
    },
    cardStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
    headerShown: false,
  }),
})

/**
 * Used for Camera without header
 */
export const stackScreenModalProps = ({ theme }) => ({
  options: (props) => ({
    gestureDirection: 'vertical',
    gestureResponseDistance: {
      horizontal: Layout.window.width,
      vertical: Layout.window.height,
    },
    cardStyle: {
      backgroundColor: 'transparent',
      gestureDirection: 'vertical',
    },
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  }),
})

/**
 * Used for Profile Screens without application logo but text
 */
export const stackScreenPageProps = ({ theme, themes }) => ({ options } = {}) => ({
  options: (props) => {
    const active = getActiveRouteName(props.route)
    const activeTheme = getActiveTheme({ theme, themes, route: active })

    const backgroundColor = (
      path(['colors', 'backgroundPrimary'])(activeTheme) ||
      path(['colors', 'backgroundPrimary'])(theme)
    )

    const color = (
      path(['colors', 'text'])(activeTheme) ||
      path(['colors', 'text'])(theme)
    )

    return ({
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      gestureDirection: 'horizontal',
      gestureResponseDistance: {
        horizontal: Layout.window.width,
        vertical: Layout.window.height,
      },
      cardStyle: {
        backgroundColor,
      },
      headerTitleStyle: {
        color,
      },
      headerStyle: {
        backgroundColor,
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
        borderBottomWidth: 0,
        shadowColor: 'transparent',
      },
      headerLeft: pageHeaderLeft,
      headerRight: () => null,
      headerTintColor: 'red',
      ...options,
    })
  },
})

/**
 * Used for Card Screens without application logo but text
 */
export const stackScreenCardProps = ({ theme }) => ({
  options: (props) => ({
    gestureResponseDistance: {
      horizontal: Layout.window.width,
      vertical: Layout.window.height,
    },
    cardStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
    header: () => null,
  }),
})

export const tabNavigatorProps = ({ theme, themes, route }) => {
  const active = getActiveRouteName(route)
  const activeTheme = getActiveTheme({ theme, themes, route: active })

  const activeTintColor =  (
    path(['colors', 'primaryIcon'])(activeTheme) ||
    path(['colors', 'primaryIcon'])(theme)
  )

  const inactiveTintColor = `${activeTintColor}90`

  const backgroundColor = (
    path(['colors', 'backgroundPrimary'])(activeTheme) ||
    path(['colors', 'backgroundPrimary'])(theme)
  )

  return ({
    tabBarOptions: {
      showLabel: false,
      activeTintColor,
      inactiveTintColor,
      style: {
        backgroundColor,
        borderTopWidth: 0,
      },
    },
  })
}