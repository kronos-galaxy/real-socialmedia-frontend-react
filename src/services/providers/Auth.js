import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authActions from 'store/ducks/auth/actions'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import useAppState from 'services/AppState'

/**
 * 
 */
export const AuthProvider = ({
  children,
}) => {
  const dispatch = useDispatch()
  const userId = useSelector(authSelector.authUserIdSelector)

  /**
   * Constructor function to fetch: Translations, Themes and Auth data
   */
  useEffect(() => {
    dispatch(authActions.authFlowRequest({ allowAnonymous: false }))
  }, [])

  const startApp = (userId) => {
    if(!userId) return

    dispatch(subscriptionsActions.subscriptionsMainRequest())
    dispatch(subscriptionsActions.subscriptionsPollRequest())
    dispatch(subscriptionsActions.subscriptionsPrefetchRequest())
  }

  /**
   * Application version check handler, which forces users to update
   * the app if new build is available
   */
  useAppState({
    onForeground: () => {
      startApp(userId)
    },
    onBackground: () => {
      if (userId) {
        dispatch(subscriptionsActions.subscriptionsMainIdle())
        dispatch(subscriptionsActions.subscriptionsPollIdle())
      }
    },
  })

  return children
}