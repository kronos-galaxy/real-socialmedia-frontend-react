import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import rootReducer from 'store/reducers'
import rootSaga from 'store/sagas'
import { amplifyConfig } from 'services/AWS'
import { Credentials } from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'
import Cache from '@aws-amplify/cache'
import API from '@aws-amplify/api'
import * as Logger from 'services/Logger'
import AsyncStorage from '@react-native-community/async-storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

amplifyConfig()

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'translation'],
  stateReconciler: autoMergeLevel2,
}

const sagaMiddleware = createSagaMiddleware({
  context: {
    AwsAuth: Auth,
    AwsAPI: API,
    AwsCache: Cache,
    AwsCredentials: Credentials,
  },
  onError: Logger.captureException,
})

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
  actionsBlacklist: [
    'LAYOUT_POSTS_LIST_ITEM_SUCCESS',
    'LAYOUT_POSTS_LIST_SCROLL_SUCCESS',
    'LAYOUT_POST_MEDIA_ITEM_SUCCESS',
    'LAYOUT_POST_MEDIA_SCROLL_SUCCESS',

    'CACHE_FETCH_REQUEST',
    'CACHE_FETCH_SUCCESS',
    'CACHE_FETCH_FAILURE',
    'CACHE_FETCH_IDLE',

    'CACHE_FETCH_64P_REQUEST',
    'CACHE_FETCH_480P_REQUEST',
    'CACHE_FETCH_1080P_REQUEST',
    'CACHE_FETCH_4K_REQUEST',
  ],
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga, persistor)

export default store
