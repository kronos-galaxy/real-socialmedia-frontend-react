import { createSelectorCreator, defaultMemoize } from 'reselect'
import update from 'immutability-helper'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import equals from 'ramda/src/equals'
import assocPath from 'ramda/src/assocPath'
import compose from 'ramda/src/compose'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals
)

const usersPool = () => path(['users', 'usersPool'])
const chatPool = () => path(['chat', 'chatPool'])
const chatPoolChat = (chatId) => path(['chat', 'chatPool', chatId])
const chatGetChatCache = (chatId) => path(['chat', 'chatGetChatCache', chatId])

/**
 * Services
 */
const chatPoolMap = (chatPool) => (chatId) => path([chatId, 'data'])(chatPool)

const chatUsersMap = (usersPool) => (chat) => {
  const mappedUsers = pathOr([], ['users', 'items'])(chat).map((userId) =>
    path([userId, 'data'])(usersPool)
  )
  return assocPath(['users', 'items'], mappedUsers)(chat)
}

const chatAuthorMap = (usersPool) => (chat) => {
  const mappedUsers = pathOr([], ['messages', 'items'])(chat).map((message) => {
    const user = path([message.author, 'data'])(usersPool)
    return assocPath(['author'], user)(message)
  })
  return assocPath(['messages', 'items'], mappedUsers)(chat)
}

/**
 *
 */
const chatGetChat = () => path(['chat', 'chatGetChat'])
export const chatGetChatSelector = (chatId) => createDeepEqualSelector(
  [chatGetChat(chatId), chatPoolChat(chatId), usersPool(),],
  (chatGetChat, chatPoolChat, usersPool) => {
    const mappedChat = compose(
      chatAuthorMap(usersPool),
      chatUsersMap(usersPool),
      path(['data']),
    )(chatPoolChat)
    return assocPath(['data'], mappedChat)(chatGetChat)
  },
)

/**
 *
 */
const chatGetChats = () => path(['chat', 'chatGetChats'])
export const chatGetChatsSelector = () => createDeepEqualSelector(
  [chatGetChats(), chatPool(), usersPool()],
  (chatGetChats, chatPool, usersPool) => {
  	const nextData = pathOr([], ['data'])(chatGetChats)
    .map(chatPoolMap(chatPool))
    .map(chatUsersMap(usersPool))
    .map(chatAuthorMap(usersPool))
	  return assocPath(['data'], nextData)(chatGetChats)
  },
)


/**
 *
 */
const chatCreateDirect = () => path(['chat', 'chatCreateDirect'])
export const chatCreateDirectSelector = (chatId) => createDeepEqualSelector(
  [chatCreateDirect(chatId), usersPool()],
  (chatCreateDirect, usersPool) => {
    const user = path([chatCreateDirect.payload.userId, 'data'])(usersPool)
    return assocPath(['data', 'user'], user)(chatCreateDirect)
  },
)
