import Auth from '@aws-amplify/auth'
import Api from '@aws-amplify/api'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import { GoogleSignin } from '@react-native-community/google-signin'
import Config from 'react-native-config'

/**
 * AWS Configuration
 */
export const amplifyConfig = async () => {
  Auth.configure({
    region: Config.AWS_COGNITO_REGION,
    userPoolId: Config.AWS_COGNITO_USER_POOL_ID,
    userPoolWebClientId: Config.AWS_COGNITO_USER_POOL_WEB_CLIENT_ID,
    identityPoolId: Config.AWS_COGNITO_IDENTITY_POOL_ID,
    refreshHandlers: {
      'facebook': handleFacebookRefresh,
      'google': handleGoogleRefresh,
    },
  })

  Api.configure({
    aws_appsync_graphqlEndpoint: Config.AWS_APPSYNC_GRAPHQL_ENDPOINT,
    aws_appsync_region: Config.AWS_COGNITO_REGION,
    aws_appsync_authenticationType: Config.AWS_APPSYNC_AUTHENTICATION_TYPE,
    aws_appsync_apiKey: 'null',
  })
}

const getFacebookData = () => new Promise((resolve, reject) => {
  const handleResponse = (error, result) => {
    if (error) { reject(error) }
    else { resolve(result) }
  }
  const options = { parameters: { fields: { string: 'email,name' } } }
  const infoRequest = new GraphRequest('/me', options, handleResponse)
  new GraphRequestManager().addRequest(infoRequest).start()
})

/**
 * 
 */
export const federatedFacebookSignin = async () => {
  const response = await LoginManager.logInWithPermissions(['public_profile', 'email'])
  
  if (response.isCancelled) {
    throw new Error('Facebook auth cancelled')
  }

  const payload = await AccessToken.getCurrentAccessToken()
  const facebookUser = await getFacebookData()
  
  return {
    token: payload.accessToken,
    expires_at: payload.dataAccessExpirationTime,
    user: facebookUser,
  }
}

GoogleSignin.configure({
  offlineAccess: false,
  iosClientId: Config.GOOGLE_SIGNIN_IOS_CLIENT_ID,
  webClientId: Config.GOOGLE_SIGNIN_ANDROID_CLIENT_ID,
})

const handleGoogleRefresh = async () => {
  const getToken = (async () => {
    try {
      return await GoogleSignin.getTokens()
    } catch (error) {
      return await GoogleSignin.signInSilently()
    }
  })

  const tokens = await getToken()

  return {
    token: tokens.idToken,
    expires_at: 3600 * 1000 + new Date().getTime(),
  }
}

const handleFacebookRefresh = async () => {
  await LoginManager.logInWithPermissions(['public_profile', 'email'])
  const payload = await AccessToken.getCurrentAccessToken()

  return {
    token: payload.accessToken,
    expires_at: payload.dataAccessExpirationTime,
  }
}

/**
 * 
 */
export const federatedGoogleSignin = async () => {
  await GoogleSignin.hasPlayServices()

  const googleUser = await (async () => {
    if (await GoogleSignin.isSignedIn()) {
      await GoogleSignin.signInSilently()
      return await GoogleSignin.getCurrentUser()
    } else {
      return await GoogleSignin.signIn()
    }
  })()

  return {
    token: googleUser.idToken,
    expires_at: 3600 * 1000 + new Date().getTime(),
    user: googleUser.user,
  }
}
