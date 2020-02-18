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

const handleFacebookRefresh = async () => {
  await LoginManager.logInWithPermissions(['public_profile', 'email'])
  const payload = await AccessToken.getCurrentAccessToken()

  return {
    token: payload.accessToken,
    expires_at: payload.dataAccessExpirationTime,
  }
}

GoogleSignin.configure({
  offlineAccess: false,
  iosClientId: Config.GOOGLE_SIGNIN_IOS_CLIENT_ID,
  webClientId: Config.GOOGLE_SIGNIN_ANDROID_CLIENT_ID,
})

const handleGoogleRefresh = async () => {
  await GoogleSignin.hasPlayServices()

  const googleUser = await GoogleSignin.signInSilently()

  const tokeninfo = await (async (idToken) => {
    const data = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`)
    return await data.json()
  })(googleUser.idToken)

  return {
    token: googleUser.idToken,
    expires_at: tokeninfo.exp,
  }
}

/**
 * 
 */
export const federatedGoogleSignin = async () => {
  await GoogleSignin.hasPlayServices()

  const googleUser = (
    await GoogleSignin.getCurrentUser() ||
    await GoogleSignin.signIn()
  )

  const tokeninfo = await (async (idToken) => {
    const data = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`)
    return await data.json()
  })(googleUser.idToken)

  return {
    token: googleUser.idToken,
    expires_at: tokeninfo.exp,
    user: googleUser.user,
  }
}
