import { createSelectorCreator, defaultMemoize } from 'reselect'
import update from 'immutability-helper'
import path from 'ramda/src/path'
import equals from 'ramda/src/equals'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals
)

const chatGetChat = () => path(['chat', 'chatGetChat'])
const chatGetChatCache = (chatId) => path(['chat', 'chatGetChatCache', chatId])

export const chatGetChatSelector = (chatId) => createDeepEqualSelector(
  [chatGetChat(chatId), chatGetChatCache(chatId)],
  (chatGetChat, chatGetChatCache) => chatGetChatCache || chatGetChat,
)