import { createSelector } from 'reselect'
import update from 'immutability-helper'
import pathOr from 'ramda/src/pathOr'

export const authUserSelector = createSelector(
  state => state.auth.user,
  authUser => update(authUser, {
    data: {
      $set: {
        username: pathOr('', ['data', 'username'], authUser),
        fullName: pathOr('', ['data', 'fullName'], authUser),
        bio: pathOr('', ['data', 'bio'], authUser),
        email: pathOr('', ['data', 'email'], authUser),
        phoneNumber: pathOr('', ['data', 'phoneNumber'], authUser),
        privacyStatus: pathOr('', ['data', 'privacyStatus'], authUser),
        followCountsHidden: pathOr('', ['data', 'followCountsHidden'], authUser),
        photoUrl: pathOr('', ['data', 'photoUrl'], authUser),
        photoUrl64p: pathOr('', ['data', 'photoUrl64p'], authUser),
        photoUrl480p: pathOr('', ['data', 'photoUrl480p'], authUser),
        photoUrl1080p: pathOr('', ['data', 'photoUrl1080p'], authUser),
        photoUrl4k: pathOr('', ['data', 'photoUrl4k'], authUser),
      },
    },
  })
)

export const languageCodeSelector = 
  state => pathOr('', ['auth', 'user', 'languageCode'], state)

export const themeCodeSelector = 
  state => pathOr('black.red', ['auth', 'user', 'themeCode'], state)

export const themeFetchSelector =
  state => pathOr([], ['theme', 'themeFetch', 'data'], state)

export const themeSelector = createSelector(
  themeCodeSelector,
  themeFetchSelector,
  (themeCode, themeFetch) => {
    return (themeFetch.find(theme => theme.key === themeCode) || {}).theme
  }
)