import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { STORAGE_PROVIDER } from 'services/Storage'

import auth from 'store/ducks/auth/reducer'
import signup from 'store/ducks/signup/reducer'
import camera from 'store/ducks/camera/reducer'
import posts from 'store/ducks/posts/reducer'
import albums from 'store/ducks/albums/reducer'
import purchases from 'store/ducks/purchases/reducer'
import chat from 'store/ducks/chat/reducer'
import users from 'store/ducks/users/reducer'
import app from 'store/ducks/app/reducer'
import cache from 'store/ducks/cache/reducer'
import entities from 'store/ducks/entities/reducer'
import subscriptions from 'store/ducks/subscriptions/reducer'
import contacts from 'store/ducks/contacts/reducer'
import dating from 'store/ducks/dating/reducer'
import { reducer as network } from 'react-native-offline'

import 'store/ducks/posts/updates'
import 'store/ducks/users/updates'
import 'store/ducks/chat/updates'

const appPersistConfig = {
  key: '/v2/app',
  storage: STORAGE_PROVIDER,
  whitelist: [
    // 'user',
  ],
}

const postsPersistConfig = {
  key: '/v2/posts',
  storage: STORAGE_PROVIDER,
  whitelist: [
    // 'postsFeedGet',
    // 'postsGet',
    // 'postsGetCache',
    // 'postsGetTrendingPosts',
    // 'postsPool',
    
    // 'postsCreateQueue',
    // 'postsRecreateQueue',
  ],
}

const usersPersistConfig = {
  key: '/v2/users',
  storage: STORAGE_PROVIDER,
  whitelist: [
    // 'usersPool',
  ],
}

const authPersistConfig = {
  key: '/v2/auth',
  storage: STORAGE_PROVIDER,
  whitelist: [
    // 'user',
  ],
}

const signupPersistConfig = {
  key: '/v2/signup',
  storage: STORAGE_PROVIDER,
  whitelist: [
    // 'signupCognitoIdentity',
  ],
}

const chatPersistConfig = {
  key: '/v2/chat',
  storage: STORAGE_PROVIDER,
  whitelist: [
    // 'chatGetChats',
  ],
}

const purchasesPersistConfig = {
  key: '/v2/purchases',
  storage: STORAGE_PROVIDER,
}

const contactsPersistConfig = {
  key: '/v2/contacts',
  version: 2,
  storage: STORAGE_PROVIDER,
}

export default combineReducers({
  app: persistReducer(appPersistConfig, app),
  network,
  auth: persistReducer(authPersistConfig, auth),
  signup: persistReducer(signupPersistConfig, signup),
  camera,
  albums,
  purchases: persistReducer(purchasesPersistConfig, purchases),
  chat: persistReducer(chatPersistConfig, chat),
  posts: persistReducer(postsPersistConfig, posts),
  users: persistReducer(usersPersistConfig, users),
  contacts: persistReducer(contactsPersistConfig, contacts),
  dating,
  cache,
  entities,
  subscriptions,
})