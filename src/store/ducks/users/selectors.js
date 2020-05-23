import { createSelectorCreator, defaultMemoize } from 'reselect'
import update from 'immutability-helper'
import path from 'ramda/src/path'
import equals from 'ramda/src/equals'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals
)

const usersGetProfile = () => path(['users', 'usersGetProfile'])
const usersGetProfileCache = (userId) => path(['users', 'usersGetProfileCache', userId])

export const usersGetProfileSelector = (userId) => createDeepEqualSelector(
  [usersGetProfile(userId), usersGetProfileCache(userId)],
  (usersGetProfile, usersGetProfileCache) => usersGetProfileCache || usersGetProfile,
)