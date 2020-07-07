import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as postsActions from 'store/ducks/posts/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import path from 'ramda/src/path'
import * as Logger from 'services/Logger'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import * as Linking from 'services/Linking'
import { useNavigation } from '@react-navigation/native'

/**
 * 
 */
export const AppProvider = ({
  children,
}) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  
  const user = useSelector(authSelector.authUserSelector)
  const postsDelete = useSelector(state => state.posts.postsDelete)
  const postsArchive = useSelector(state => state.posts.postsArchive)
  const postsRestoreArchived = useSelector(state => state.posts.postsRestoreArchived)
  const postsFlag = useSelector(state => state.posts.postsFlag)

  /**
   * Sentry specific logger to map partial user data to error log
   */
  useEffect(() => {
    Logger.setUser(user)
    PushNotificationIOS.addEventListener('register', (token) => {
      dispatch(usersActions.usersSetApnsTokenRequest({ token }))
    })
    PushNotificationIOS.addEventListener('notification', (notification) => {
      const action = path(['data', 'pinpoint', 'deeplink'])(notification.getData())
      Linking.deeplinkNavigation(navigation)(action)
    })
    PushNotificationIOS.requestPermissions()
    dispatch(usersActions.usersGetCardsRequest({}))
    dispatch(postsActions.postsGetUnreadCommentsRequest({ limit: 20 }))
  }, [user.userId])


  useEffect(() => {
    if (postsDelete.status === 'success') {
      dispatch(postsActions.postsDeleteIdle({}))
      dispatch(postsActions.postsGetRequest({ userId: user.userId }))
    }

    if (postsArchive.status === 'success') {
      dispatch(postsActions.postsArchiveIdle({}))
      dispatch(postsActions.postsGetRequest({ userId: user.userId }))
    }

    if (postsRestoreArchived.status === 'success') {
      dispatch(postsActions.postsRestoreArchivedIdle({}))
      dispatch(postsActions.postsGetRequest({ userId: user.userId }))
    }

    if (postsFlag.status === 'success') {
      dispatch(postsActions.postsFlagIdle({}))
    }
  }, [
    postsDelete.status,
    postsArchive.status,
    postsRestoreArchived.status,
    postsFlag.status,
  ])

  return children({
    user,
  })
}