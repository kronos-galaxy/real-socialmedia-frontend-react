import { createSelector } from 'reselect'
import pathOr from 'ramda/src/pathOr'

export const appTranslationSelector =
  state => pathOr({}, ['app', 'appTranslation', 'data'], state)


export const themeCodeSelector = 
  state => pathOr('black.green', ['auth', 'user', 'themeCode'], state)

export const appThemeSelector =
  state => pathOr([], ['app', 'appTheme', 'data'], state)

export const userThemeSelector = themeCode => createSelector(
  appThemeSelector,
  (appTheme) => {
    return (appTheme.find(theme => theme.key === themeCode) || {}).theme
  },
)