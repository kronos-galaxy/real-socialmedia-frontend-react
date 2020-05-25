import { createSelectorCreator, defaultMemoize } from 'reselect'
import update from 'immutability-helper'
import path from 'ramda/src/path'
import equals from 'ramda/src/equals'
import assocPath from 'ramda/src/assocPath'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals
)

const user = () => path(['auth', 'user'])
const usersGetProfileCache = () => path(['users', 'usersGetProfileCache'])
const usersGetProfileCacheUser = (userId) => path(['users', 'usersGetProfileCache', userId])
const usersGetFollowedUsersCacheUser = (userId) => path(['users', 'usersGetFollowedUsersCache', userId])
const usersGetFollowerUsersCacheUser = (userId) => path(['users', 'usersGetFollowerUsersCache', userId])

/**
 *
 */
const usersGetProfile = () => path(['users', 'usersGetProfile'])

export const usersGetProfileSelector = (userId) => createDeepEqualSelector(
  [usersGetProfile(), usersGetProfileCacheUser(userId)],
  (usersGetProfile, usersGetProfileCacheUser) => usersGetProfileCacheUser || usersGetProfile,
)

/**
 *
 */
const usersGetProfileSelf = () => path(['users', 'usersGetProfileSelf'])

export const usersGetProfileSelfSelector = () => createDeepEqualSelector(
  [usersGetProfileSelf(), user()],
  (usersGetProfileSelf, user) => update(user || usersGetProfileSelf, { data: { $set: user } }),
)

/**
 *
 */
const usersGetFollowedUsers = () => path(['users', 'usersGetFollowedUsers'])

export const usersGetFollowedUsersSelector = (userId) => createDeepEqualSelector(
  [usersGetFollowedUsers(), usersGetFollowedUsersCacheUser(userId)],
  (usersGetFollowedUsers, usersGetFollowedUsersCacheUser) => usersGetFollowedUsersCacheUser || usersGetFollowedUsers,
)

/**
 *
 */
const usersGetFollowerUsers = () => path(['users', 'usersGetFollowerUsers'])

export const usersGetFollowerUsersSelector = (userId) => createDeepEqualSelector(
  [usersGetFollowerUsers(), usersGetFollowerUsersCacheUser(userId)],
  (usersGetFollowerUsers, usersGetFollowerUsersCacheUser) => usersGetFollowerUsersCacheUser || usersGetFollowerUsers,
)

/**
 *
 */
const usersGetTrendingUsers = () => path(['users', 'usersGetTrendingUsers'])

export const usersGetTrendingUsersSelector = () => createDeepEqualSelector(
  [usersGetTrendingUsers(), usersGetProfileCache()],
  (usersGetTrendingUsers, usersGetProfileCache) => {
    const mappedUsers = usersGetTrendingUsers.data.map(user =>
      path([user.userId, 'data'])(usersGetProfileCache) || user
    )
    return assocPath(['data'], mappedUsers)(usersGetTrendingUsers)
  },
)
