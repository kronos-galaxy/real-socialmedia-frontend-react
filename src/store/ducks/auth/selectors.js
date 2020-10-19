import { createSelector } from 'reselect'
import pathOr from 'ramda/src/pathOr'
import path from 'ramda/src/path'
import is from 'ramda/src/is'
import * as normalizer from 'normalizer/schemas'
import * as entitiesSelector from 'store/ducks/entities/selectors'
import * as usersSelector from 'store/ducks/users/selectors'

const authUser = () => path(['auth', 'user'])
const usersEditProfile = () => path(['users', 'usersEditProfile'])
const usersGetProfileSelf = () => path(['users', 'usersGetProfileSelf'])

export const authUserSelector = createSelector(
  [authUser(), usersEditProfile(), usersGetProfileSelf(), usersSelector.usersDeleteAvatar, usersSelector.usersChangeAvatar, entitiesSelector.entities],
  (authUser, usersEditProfile, usersGetProfileSelf, usersDeleteAvatar, usersChangeAvatar, entities) => {
    return normalizer.denormalizeUserGet(authUser, entities)
  },
)

export const authUserIdSelector = createSelector(
  [authUser()],
  (authUser) => {
    return is(String, authUser) && authUser
  },
)

export const languageCodeSelector = 
  state => pathOr('', ['auth', 'user', 'languageCode'], state)

export const themeCodeSelector = 
  state => pathOr('black.green', ['auth', 'user', 'themeCode'], state)

export const appThemeSelector =
  state => pathOr([], ['app', 'appTheme', 'data'], state)

export const themeSelector = createSelector(
  authUserSelector,
  appThemeSelector,
  (authUser, appTheme) => {
    const activeTheme = pathOr('black.green', ['themeCode'])(authUser)
    return (appTheme.find(theme => theme.key === activeTheme) || {}).theme
  },
)