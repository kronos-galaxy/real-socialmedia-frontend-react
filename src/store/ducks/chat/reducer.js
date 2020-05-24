import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/chat/constants'

const initialState = {
  chatGetChats: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  chatGetChat: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  chatCreateDirect: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  chatAddMessage: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },

  chatGetChatCache: {},
}

/**
 *
 */
const chatGetChatsRequest = (state, action) => update(state, {
  chatGetChats: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const chatGetChatsSuccess = (state, action) => update(state, {
  chatGetChats: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },
})

const chatGetChatsFailure = (state, action) => update(state, {
  chatGetChats: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
  },
})

const chatGetChatsIdle = (state, action) => update(state, {
  chatGetChats: {
    status: { $set: 'idle' },
    payload: { $set: action.payload.payload },
  },
})

/**
 *
 */
const chatGetChatRequest = (state, action) => update(state, {
  chatGetChat: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
  chatGetChatCache: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.chatId,
      initialState: initialState.chatGetChat,
    },
  },
})

const chatGetChatSuccess = (state, action) => update(state, {
  chatGetChat: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },
  chatGetChatCache: {
    $resourceCacheSetSuccess: {
      ...action,
      resourceKey: action.payload.payload.chatId,
      initialState: initialState.chatGetChat,
    },
  },
})

const chatGetChatFailure = (state, action) => update(state, {
  chatGetChat: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
  },
  chatGetChatCache: {
    $resourceCacheSetFailure: {
      ...action,
      resourceKey: action.payload.payload.chatId,
      initialState: initialState.chatGetChat,
    },
  },
})

const chatGetChatIdle = (state, action) => update(state, {
  chatGetChat: {
    status: { $set: 'idle' },
    payload: { $set: action.payload.payload },
  },
  chatGetChatCache: {
    $resourceCacheSetIdle: {
      ...action,
      resourceKey: action.payload.payload.chatId,
      initialState: initialState.chatGetChat,
    },
  },
})

/**
 *
 */
const chatCreateDirectRequest = (state, action) => update(state, {
  chatCreateDirect: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const chatCreateDirectSuccess = (state, action) => update(state, {
  chatCreateDirect: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },
})

const chatCreateDirectFailure = (state, action) => update(state, {
  chatCreateDirect: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
  },
})

const chatCreateDirectIdle = (state, action) => update(state, {
  chatCreateDirect: {
    status: { $set: 'idle' },
    payload: { $set: action.payload.payload },
  },
})

/**
 *
 */
const chatAddMessageRequest = (state, action) => update(state, {
  chatAddMessage: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const chatAddMessageSuccess = (state, action) => update(state, {
  chatAddMessage: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },
})

const chatAddMessageFailure = (state, action) => update(state, {
  chatAddMessage: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
  },
})

const chatAddMessageIdle = (state, action) => update(state, {
  chatAddMessage: {
    status: { $set: 'idle' },
    payload: { $set: action.payload.payload },
  },
})

export default handleActions({
  [constants.CHAT_GET_CHATS_REQUEST]: chatGetChatsRequest,
  [constants.CHAT_GET_CHATS_SUCCESS]: chatGetChatsSuccess,
  [constants.CHAT_GET_CHATS_FAILURE]: chatGetChatsFailure,
  [constants.CHAT_GET_CHATS_IDLE]: chatGetChatsIdle,

  [constants.CHAT_GET_CHAT_REQUEST]: chatGetChatRequest,
  [constants.CHAT_GET_CHAT_SUCCESS]: chatGetChatSuccess,
  [constants.CHAT_GET_CHAT_FAILURE]: chatGetChatFailure,
  [constants.CHAT_GET_CHAT_IDLE]: chatGetChatIdle,

  [constants.CHAT_CREATE_DIRECT_REQUEST]: chatCreateDirectRequest,
  [constants.CHAT_CREATE_DIRECT_SUCCESS]: chatCreateDirectSuccess,
  [constants.CHAT_CREATE_DIRECT_FAILURE]: chatCreateDirectFailure,
  [constants.CHAT_CREATE_DIRECT_IDLE]: chatCreateDirectIdle,

  [constants.CHAT_ADD_MESSAGE_REQUEST]: chatAddMessageRequest,
  [constants.CHAT_ADD_MESSAGE_SUCCESS]: chatAddMessageSuccess,
  [constants.CHAT_ADD_MESSAGE_FAILURE]: chatAddMessageFailure,
  [constants.CHAT_ADD_MESSAGE_IDLE]: chatAddMessageIdle,
}, initialState)
