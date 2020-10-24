import { navigateToPath, pushToPath } from 'navigation/helpers'

const withAuthValidation = (callback) => {
  return (navigation, params = {}, meta = {}) => {
    return () => {
      if (!meta.protected) {
        return callback(navigation, params)
      }

      if (meta.user && meta.user.userStatus === 'ACTIVE') {
        return callback(navigation, params)
      }

      return navigateProfileUpgrade(navigation)
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

export const navigateBack = (navigation) => () => navigation.goBack()

export const navigatePop = (navigation) => () => navigation.popToTop()

export const navigateApp = navigateToPath('App')

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

export const navigateSearch = navigateToPath('App.Root.Home.Search')

export const navigateCamera = withAuthValidation(navigateToPath('Camera'))

export const navigateStory = withAuthValidation(pushToPath('Story'))

/**
 * Chat
 */
export const navigateChat = withAuthValidation(navigateToPath('App.Chat'))
export const navigateChatDirect = withAuthValidation(navigateToPath('App.Chat.ChatDirect'))
export const navigateChatOptions = withAuthValidation(navigateToPath('App.Chat.ChatOptions'))
 
/**
 * Dating
 */
export const navigateDating = withAuthValidation(navigateToPath('Dating'))
export const navigateDatingAbout = withAuthValidation(navigateToPath('DatingAbout'))
export const navigateDatingMatch = withAuthValidation(navigateToPath('DatingMatch'))
export const navigateDatingProfile = withAuthValidation(navigateToPath('DatingProfile'))

export const navigatePostShare = withAuthValidation(pushToPath('PostShare'))
export const navigatePostEdit = withAuthValidation(navigateToPath('PostEdit'))
export const navigateProfileRequests = withAuthValidation(navigateToPath('App.Chat.ProfileRequests'))
export const navigateProfilePhoto = navigateToPath('App.Root.Home.Profile.ProfilePhoto')
export const navigateInviteFriends = navigateToPath('App.Root.Home.Profile.InviteFriends')
export const navigateProfilePhotoUpload = withAuthValidation(navigateToPath('App.Root.Home.Profile.ProfilePhotoUpload'))

/**
 * Albums
 */
export const navigateAlbum = withAuthValidation(pushToPath('Album'))
export const navigateAlbumCreate = withAuthValidation(navigateToPath('AlbumCreate'))
export const navigateAlbumEdit = withAuthValidation(navigateToPath('AlbumEdit'))
export const navigateAlbums = withAuthValidation(navigateToPath('Albums'))

export const navigateComments = withAuthValidation(pushToPath('Comments'))
export const navigatePostType = withAuthValidation(navigateToPath('PostType'))
export const navigateProfileUpgrade = navigateToPath('App.Root.ProfileUpgrade')
export const navigateProfile = withAuthValidation(pushToPath('Profile'))
export const navigateProfileSelf = withAuthValidation(navigateToPath('App.Root.Home.Profile'))
export const navigateProfileFollower = withAuthValidation(pushToPath('ProfileFollower'))
export const navigateProfileFollowed = withAuthValidation(pushToPath('ProfileFollowed'))
export const navigatePostMedia = withAuthValidation(pushToPath('PostMedia'))
export const navigatePostLikes = withAuthValidation(pushToPath('PostLikes'))
export const navigatePostViews = withAuthValidation(pushToPath('PostViews'))
export const navigateSettings = withAuthValidation(navigateToPath('App.Root.Home.Profile.Settings'))
export const navigatePayout = withAuthValidation(navigateToPath('Payout'))
export const navigateVerification = withAuthValidation(navigateToPath('Verification'))

/**
 * Auth
 */
export const navigateAuthHome = navigateToPath('Auth.AuthHome')
export const navigateAuthUsername = navigateToPath('Auth.AuthUsername')
export const navigateAuthPhoneConfirm = navigateToPath('Auth.AuthPhoneConfirm')
export const navigateAuthPassword = navigateToPath('Auth.AuthPassword')
export const navigateAuthEmailConfirm = navigateToPath('Auth.AuthEmailConfirm')
export const navigateAuthForgotConfirm = navigateToPath('Auth.AuthForgotConfirm')

/**
 * Signin
 */
export const navigateSignin = navigateToPath('Auth.Signin')
export const navigateAuthSigninPhone = navigateToPath('Auth.Signin.AuthSigninPhone')
export const navigateAuthSigninEmail = navigateToPath('Auth.Signin.AuthSigninEmail')

/**
 * Signup
 */
export const navigateSignup = navigateToPath('Auth.Signup')
export const navigateAuthPhone = navigateToPath('Auth.Signup.AuthPhone')
export const navigateAuthEmail = navigateToPath('Auth.Signup.AuthEmail')

/**
 * Forgot
 */
export const navigateForgot = navigateToPath('Auth.Forgot')
export const navigateAuthForgotEmail = navigateToPath('Auth.Forgot.AuthForgotEmail')
export const navigateAuthForgotPhone = navigateToPath('Auth.Forgot.AuthForgotPhone')
