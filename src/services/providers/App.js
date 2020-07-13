import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as postsActions from 'store/ducks/posts/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import path from 'ramda/src/path'
import * as Logger from 'services/Logger'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import * as Linking from 'services/Linking'
import { useNavigation } from '@react-navigation/native'
import useAppState from 'services/AppState'

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

  const handlePushNotification = (notification) => {
    if (!notification) return
    const action = path(['data', 'pinpoint', 'deeplink'])(notification.getData())
    Linking.deeplinkNavigation(navigation)(action)
  }

  const handlePermissions = (permissions) => {
    if (permissions && permissions.alert && permissions.badge) {
      return
    }
    PushNotificationIOS.requestPermissions()
  }

  useAppState({
    onForeground: () => {
      PushNotificationIOS.checkPermissions(handlePermissions)
    },
  })

  /**
   * Sentry specific logger to map partial user data to error log
   */
  useEffect(() => {
    Logger.setUser(user)

    PushNotificationIOS.checkPermissions(handlePermissions)
    PushNotificationIOS.getInitialNotification().then(handlePushNotification)
    PushNotificationIOS.addEventListener('notification', handlePushNotification)
    PushNotificationIOS.addEventListener('register', (token) => {
      dispatch(usersActions.usersSetApnsTokenRequest({ token }))
    })

    return () => {
      PushNotificationIOS.removeEventListener('notification', () => {})
      PushNotificationIOS.removeEventListener('register', () => {})
    }
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