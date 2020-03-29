import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as chatActions from 'store/ducks/chat/actions'
import { v4 as uuid } from 'uuid'
import { useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'

const ChatDirectService = ({ children, }) => {
  const dispatch = useDispatch()
  const route = useRoute()
  const usersGetTrendingUsers = useSelector(state => state.users.usersGetTrendingUsers)
  const chatCreateDirect = useSelector(state => state.users.chatCreateDirect)
  const chatAddMessage = useSelector(state => state.users.chatAddMessage)
  const chatId = path(['params', 'chat', 'chatId'])(route)
  const userId = path(['params', 'user', 'userId'])(route)

  useEffect(() => {
    dispatch(chatActions.chatGetChatRequest({ chatId }))
  }, [])

  const chatCreateDirectRequest = (payload) => {
    const chatId = uuid()
    const messageId = uuid()
    dispatch(chatActions.chatCreateDirectRequest({
      chatId,
      userId,
      messageId,
      messageText: payload.text,
    }))
  }

  const chatAddMessageRequest = (payload) => {
    const messageId = uuid()
    dispatch(chatActions.chatAddMessageRequest({
      messageId,
      text: payload.text,
    }))
  }

  return children({
    chatCreateDirect,
    chatAddMessage,
    chatAddMessageRequest,
    chatCreateDirectRequest,
    usersGetTrendingUsers,
  })
}

export default ChatDirectService
