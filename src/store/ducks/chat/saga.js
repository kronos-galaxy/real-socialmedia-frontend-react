import { graphqlOperation } from '@aws-amplify/api'
import { put, takeLatest, getContext } from 'redux-saga/effects'
import * as actions from 'store/ducks/chat/actions'
import * as queries from 'store/ducks/chat/queries'
import * as constants from 'store/ducks/chat/constants'
import path from 'ramda/src/path'

/**
 * 
 */
function* chatGetChatsRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.chats, req.payload))
    const selector = path(['data', 'self', 'chats'])

    yield put(actions.chatGetChatsSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.chatGetChatsFailure({ message: error.message, payload: req.payload }))
  }
}

/**
 * 
 */
function* chatGetChatRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.chat, req.payload))
    const selector = path(['data', 'chat'])

    yield put(actions.chatGetChatSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.chatGetChatFailure({ message: error.message, payload: req.payload }))
  }
}

/**
 * 
 */
function* chatCreateDirectRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.createDirectChat, req.payload))
    const selector = path(['data', 'createDirectChat'])

    yield put(actions.chatCreateDirectSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.chatCreateDirectFailure({ message: error.message, payload: req.payload }))
  }
}

/**
 * 
 */
function* chatAddMessageRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.addChatMessage, req.payload))
    const selector = path(['data', 'addChatMessage'])

    yield put(actions.chatAddMessageSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.chatAddMessageFailure({ message: error.message, payload: req.payload }))
  }
}

export default () => [
  takeLatest(constants.CHAT_GET_CHATS_REQUEST, chatGetChatsRequest),
  takeLatest(constants.CHAT_GET_CHAT_REQUEST, chatGetChatRequest),
  takeLatest(constants.CHAT_CREATE_DIRECT_REQUEST, chatCreateDirectRequest),
  takeLatest(constants.CHAT_ADD_MESSAGE_REQUEST, chatAddMessageRequest),
]