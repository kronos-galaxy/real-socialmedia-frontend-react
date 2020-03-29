import {
  chatFragment,
  chatMessageFragment,
} from 'store/fragments'

export const chats = `
  query chats($limit: Int, $nextToken: String) {
    self {
      chats(limit: $limit, nextToken: $nextToken) {
        items {
          ...chatFragment
        }
        nextToken
      }
    }
  }
  ${chatFragment}
`

export const chat = `
  query chat($chatId: ID!) {
    chat(chatId: $chatId) {
      ...chatFragment
    }
  }
  ${chatFragment}
`

export const createDirectChat = `
  mutation createDirectChat(
    $chatId: ID!,
    $userId: ID!,
    $messageId: ID!
    $messageText: String!
  ) {
    createDirectChat(
      chatId: $chatId,
      userId: $userId,
      messageId: $messageId,
      messageText: $messageText,
    ) {
      ...chatFragment
    }
  }
  ${chatFragment}
`

export const addChatMessage = `
  mutation addChatMessage(
    chatId: ID!,
    messageId: ID!
    text: String!
  ) {
    addChatMessage(
      chatId: $chatId,
      messageId: $messageId,
      text: $text,
    ) {
      ...chatMessageFragment
    }
  }
  ${chatMessageFragment}
`
