import { getContext } from 'redux-saga/effects'

export function* getNavigation() {
  const ReactNavigationRef = yield getContext('ReactNavigationRef')

  return ReactNavigationRef.current
}
