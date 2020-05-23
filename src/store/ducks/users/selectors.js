import { createSelectorCreator, defaultMemoize } from 'reselect'
import update from 'immutability-helper'
import path from 'ramda/src/path'
import equals from 'ramda/src/equals'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals
)

/**
 *
 */
const usersGetProfile = () => path(['users', 'usersGetProfile'])
const usersGetProfileCache = (userId) => path(['users', 'usersGetProfileCache', userId])

export const usersGetProfileSelector = (userId) => createDeepEqualSelector(
  [usersGetProfile(), usersGetProfileCache(userId)],
  (usersGetProfile, usersGetProfileCache) => usersGetProfileCache || usersGetProfile,
)

/**
 *
 */
const usersGetProfileSelf = () => path(['users', 'usersGetProfileSelf'])
const user = () => path(['auth', 'user'])

export const usersGetProfileSelfSelector = () => createDeepEqualSelector(
  [usersGetProfileSelf(), user()],
  (usersGetProfileSelf, user) => update(user || usersGetProfileSelf, { data: { $set: user } }),
)

/**
 *
 */
const usersGetFollowedUsers = () => path(['users', 'usersGetFollowedUsers'])
const usersGetFollowedUsersCache = (userId) => path(['users', 'usersGetFollowedUsersCache', userId])

export const usersGetFollowedUsersSelector = (userId) => createDeepEqualSelector(
  [usersGetFollowedUsers(), usersGetFollowedUsersCache(userId)],
  (usersGetFollowedUsers, usersGetFollowedUsersCache) => usersGetFollowedUsersCache || usersGetFollowedUsers,
)

/**
 *
 */
const usersGetFollowerUsers = () => path(['users', 'usersGetFollowerUsers'])
const usersGetFollowerUsersCache = (userId) => path(['users', 'usersGetFollowerUsersCache', userId])

export const usersGetFollowerUsersSelector = (userId) => createDeepEqualSelector(
  [usersGetFollowerUsers(), usersGetFollowerUsersCache(userId)],
  (usersGetFollowerUsers, usersGetFollowerUsersCache) => usersGetFollowerUsersCache || usersGetFollowerUsers,
)