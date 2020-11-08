import { createSelector } from 'reselect'
import pathOr from 'ramda/src/pathOr'
import path from 'ramda/src/path'
import prop from 'ramda/src/prop'
import compose from 'ramda/src/compose'
import is from 'ramda/src/is'
import * as normalizer from 'normalizer/schemas'
import * as entitiesSelector from 'store/ducks/entities/selectors'
import * as usersSelector from 'store/ducks/users/selectors'
import themesJson from 'assets/themes.json'

const authUser = () => path(['auth', 'user'])
const authData = () => path(['auth', 'authData'])
const usersEditProfile = () => path(['users', 'usersEditProfile'])
const usersGetProfileSelf = () => path(['users', 'usersGetProfileSelf'])

export const authUserSelector = createSelector(
  [authUser(), authData(), usersEditProfile(), usersGetProfileSelf(), usersSelector.usersDeleteAvatar, usersSelector.usersChangeAvatar, entitiesSelector.entities],
  (authUser, authData, usersEditProfile, usersGetProfileSelf, usersDeleteAvatar, usersChangeAvatar, entities) => {
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

export const themeSelector = createSelector(
  authUserSelector,
  (authUser) => {
    const activeTheme = pathOr('black.green', ['themeCode'])(authUser)
    return (themesJson.find(theme => theme.key === activeTheme) || {}).theme
  },
)

const authRoot = prop('auth')
export const authForgot = compose(prop('authForgot'), authRoot)
export const authSigninCognito = compose(prop('authSigninCognito'), authRoot)