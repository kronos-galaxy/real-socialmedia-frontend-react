import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as appActions from 'store/ducks/app/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import LoadingComponent from 'components/Loading'

/**
 * 
 */
export const AppProvider = ({
  children,
  onStateChangeRef,
  routeNameRef,
  navigationRef,
}) => {
  const dispatch = useDispatch()
  const appReady = useSelector(state => state.app.appReady)
  const appTheme = useSelector(state => state.app.appTheme)
  const theme = useSelector(authSelector.themeSelector)
  const networkIsConnected = useSelector(state => state.network.isConnected)

  const onStateChange = () => {
    const previousRouteName = routeNameRef.current
    const currentRouteName = navigationRef.current.getCurrentRoute().name

    if (previousRouteName !== currentRouteName) {
      dispatch(usersActions.usersReportScreenViewsRequest({ screens: [currentRouteName] }))
    }

    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName
  }
  onStateChangeRef.current = onStateChange

  /**
   * Constructor function to fetch: Translations, Themes and Auth data
   */
  useEffect(() => {
    dispatch(appActions.appReadyRequest())
  }, [])

  useEffect(() => {
  }, [])

  if (appReady.status !== 'success') {
    return <LoadingComponent />
  }

  return children({
    theme,
    themes: appTheme.data,
    networkIsConnected,
  })
}