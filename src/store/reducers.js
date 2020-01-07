import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import AsyncStorage from '@react-native-community/async-storage'

import auth from 'store/ducks/auth/reducer'
import camera from 'store/ducks/camera/reducer'
import theme from 'store/ducks/theme/reducer'
import posts from 'store/ducks/posts/reducer'
import users from 'store/ducks/users/reducer'
import layout from 'store/ducks/layout/reducer'
import translation from 'store/ducks/translation/reducer'
import cache from 'store/ducks/cache/reducer'

import 'store/ducks/posts/updates'
import 'store/ducks/users/updates'

const postsPersistConfig = {
  key: 'posts',
  storage: AsyncStorage,
  whitelist: [
    'postsFeedGet',
    'postsGet',
    'postsGetCache',
    'postsGetTrendingPosts',
    'postsStoriesGet',
    'postsCreateQueue',
  ],
}

const cachePersistConfig = {
  key: 'cache',
  storage: AsyncStorage,
}

export default combineReducers({
  auth,
  theme,
  camera,
  posts: persistReducer(postsPersistConfig, posts),
  users,
  layout,
  translation,
  cache: persistReducer(cachePersistConfig, cache),
})
