import { useEffect } from 'react'
import path from 'ramda/src/path'

import { useNavigation } from '@react-navigation/native'

export const useHeader = ({
  user,
  chatGetChat,
}) => {
  const navigation = useNavigation()

  /**
   *
   */
  useEffect(() => {
    if (!path(['data', 'users', 'items', 'length'])(chatGetChat)) {
      return
    }

    const title = path(['data', 'users', 'items'])(chatGetChat)
      .filter(chat => chat.username !== user.username)
      .map(chat => chat.username)
      .join(', ')

    navigation.setOptions({
      title,
    })
  }, [path(['data', 'users', 'items'])(chatGetChat)])
}

