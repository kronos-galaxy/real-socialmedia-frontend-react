const withAuthValidation = (callback) => {
  return (navigation, params = {}, meta = {}) => {
    return () => {
      if (!meta.protected) {
        return callback(navigation, params)
      }

      if (meta.user && meta.user.userStatus === 'ACTIVE') {
        return callback(navigation, params)
      }

      return navigation.navigate('ProfileUpgrade', params)
    }
  }
}

/**
 *
 */
export const navigateNestedPost = (navigation, params) => () =>
  navigation.navigate('App', {
    screen: 'Root',
    params: {
      screen: 'PostMedia',
      params,
    },
  })

export const navigateNestedPostViews = (navigation, params) => () =>
  navigation.navigate('App', {
    screen: 'Root',
    params: {
      screen: 'PostViews',
      params,
    },
  })

export const navigateNestedComments = (navigation, params) => () =>
  navigation.navigate('App', {
    screen: 'Root',
    params: {
      screen: 'Comments',
      params,
    },
  })

export const navigateNestedPostLikes = (navigation, params) => () =>
  navigation.navigate('App', {
    screen: 'Root',
    params: {
      screen: 'PostLikes',
      params,
    },
  })

/**
 * Root -> Home -> Feed -> Feed
 */

export const navigateBack = (navigation) => () =>
  navigation.goBack()

export const navigatePop = (navigation) => () =>
  navigation.popToTop()

export const navigateApp = (navigation) => () =>
  navigation.navigate('App')

export const navigateHome = (navigation, params) => () =>
  navigation.navigate('Root', {
    screen: 'Home',
    params: {
      screen: 'Feed',
      params: {
        screen: 'Feed',
        ...params,
      },
    },
  })

export const navigatePostCreate = (navigation, params) => () =>
  navigation.navigate('Root', {
    screen: 'PostCreate',
    params,
  })

export const navigateSearch = (navigation, params) => () =>
  navigation.navigate('Root', {
    screen: 'Home',
    params: {
      screen: 'Search',
      params,
    },
  })

export const navigateCamera = (navigation, params) => () =>
  navigation.navigate('Camera', params)

  
export const navigateStory = withAuthValidation((navigation, params) =>
  navigation.push('Story', params),
)

export const navigateChat = withAuthValidation((navigation, params) =>
  navigation.navigate('Chat', params),
)

export const navigateChatDirect = withAuthValidation((navigation, params) =>
  navigation.navigate('ChatDirect', params),
)

export const navigateChatOptions = withAuthValidation((navigation, params) =>
  navigation.navigate('ChatOptions', params),
)

export const navigateDating = withAuthValidation((navigation, params) =>
  navigation.navigate('Dating', params),
)

export const navigateDatingAbout = withAuthValidation((navigation, params) =>
  navigation.navigate('DatingAbout', params),
)

export const navigateDatingMatch = withAuthValidation((navigation, params) =>
  navigation.navigate('DatingMatch', params),
)

export const navigateDatingProfile = withAuthValidation((navigation, params) =>
  navigation.navigate('DatingProfile', params),
)

export const navigatePostShare = withAuthValidation((navigation, params) =>
  navigation.push('PostShare', params),
)

export const navigatePostEdit = withAuthValidation((navigation, params) =>
  navigation.navigate('PostEdit', params),
)

export const navigateProfileRequests = withAuthValidation((navigation, params) =>
  navigation.navigate('ProfileRequests', params),
)

export const navigateProfilePhoto = (navigation, params) => () =>
  navigation.navigate('Root', {
    screen: 'Home',
    params: {
      screen: 'Profile',
      params: {
        screen: 'ProfilePhoto',
        ...params,
      },
    },
  })

export const navigateInviteFriends = (navigation, params) => () =>
  navigation.navigate('Root', {
    screen: 'Home',
    params: {
      screen: 'Profile',
      params: {
        screen: 'InviteFriends',
        ...params,
      },
    },
  })

export const navigateProfilePhotoUpload = withAuthValidation((navigation, params) =>
  navigation.navigate('ProfilePhotoUpload', params),
)

export const navigateAlbum = withAuthValidation((navigation, params) =>
  navigation.push('Album', params),
)

export const navigateAlbumCreate = withAuthValidation((navigation, params) =>
  navigation.navigate('AlbumCreate', params),
)

export const navigateAlbumEdit = withAuthValidation((navigation, params) =>
  navigation.navigate('AlbumEdit', params),
)

export const navigateAlbums = withAuthValidation((navigation, params) =>
  navigation.navigate('Albums', params),
)

export const navigateComments = withAuthValidation((navigation, params) =>
  navigation.push('Comments', params),
)

export const navigatePostType = withAuthValidation((navigation, params) =>
  navigation.navigate('PostType', params),
)

export const navigateProfileUpgrade = withAuthValidation((navigation, params) =>
  navigation.navigate('ProfileUpgrade', params),
)

export const navigateProfile = withAuthValidation((navigation, params) =>
  navigation.push('Profile', params),
)

export const navigateProfileSelf = withAuthValidation((navigation, params) =>
  navigation.navigate('App', {
    screen: 'Root',
    params: {
      screen: 'Home',
      params: {
        screen: 'Profile',
        params,
      },
    },
  }),
)

export const navigateProfileFollower = withAuthValidation((navigation, params) =>
  navigation.push('ProfileFollower', params),
)

export const navigateProfileFollowed = withAuthValidation((navigation, params) =>
  navigation.push('ProfileFollowed', params),
)

export const navigatePostMedia = withAuthValidation((navigation, params) =>
  navigation.push('PostMedia', params),
)

export const navigatePostLikes = withAuthValidation((navigation, params) =>
  navigation.push('PostLikes', params),
)

export const navigatePostViews = withAuthValidation((navigation, params) =>
  navigation.push('PostViews', params),
)

export const navigateSettings = withAuthValidation((navigation, params) =>
  navigation.navigate('Settings', params),
)

export const navigatePayout = withAuthValidation((navigation, params) =>
  navigation.navigate('Payout', params),
)

export const navigateVerification = withAuthValidation((navigation, params) =>
  navigation.navigate('Verification', params),
)


/**
 * 
 */
export const navigateAuthHome = (navigation, params) => () =>
  navigation.navigate('Auth', {
    screen: 'AuthHome',
    params,
  })

export const navigateAuthUsername = (navigation, params) => () =>
  navigation.navigate('Auth', {
    screen: 'AuthUsername', 
    params,
  })

export const navigateAuthSigninPhone = (navigation, params) => () =>
  navigation.navigate('AuthSigninPhone', params)

export const navigateAuthSigninEmail = (navigation) => () =>
  navigation.navigate('Signin', { initialRouteName: 'AuthSigninEmail' })

export const navigateSignup = (navigation, params) => () =>
  navigation.navigate('Signup', params)

export const navigateSignin = (navigation, params) => () =>
  navigation.navigate('Signin', params)

export const navigateAuthPhone = (navigation, params) => () =>
  navigation.navigate('Signup', {
    screen: 'AuthPhone',
    params,
  })

export const navigateAuthEmail = (navigation, params) => () =>
  navigation.navigate('Signup', {
    screen: 'AuthEmail',
    params,
  })

export const navigateAuthPhoneConfirm = (navigation, params) => () =>
  navigation.navigate('AuthPhoneConfirm', params)

export const navigateAuthPassword = (navigation, params) => () =>
  navigation.navigate('AuthPassword', params)

export const navigateAuthEmailConfirm = (navigation, params) => () =>
  navigation.navigate('AuthEmailConfirm', params)

export const navigateForgot = (navigation, params) => () =>
  navigation.navigate('Forgot', params)

export const navigateAuthForgotEmail = (navigation) => () =>
  navigation.navigate('Forgot', { initialRouteName: 'AuthForgotEmail' })

export const navigateAuthForgotPhone = (navigation, params) => () =>
  navigation.navigate('AuthForgotPhone', params)

export const navigateAuthForgotConfirm = (navigation, params) => () =>
  navigation.navigate('AuthForgotConfirm', params)

export const navigateAuthCamera = (navigation, params) => () =>
  navigation.navigate('AuthCamera', params)

/**
 *
 */
export const navigateAuthSignup = (navigation, params) => () =>
  navigation.navigate('AuthSignup', params)

export const navigateAuthSignupConfirm = (navigation, params) => () =>
  navigation.navigate('AuthSignupConfirm', params)
