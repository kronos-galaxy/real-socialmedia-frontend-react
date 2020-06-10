import { createSelectorCreator, defaultMemoize } from 'reselect'
import update from 'immutability-helper'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import equals from 'ramda/src/equals'
import assocPath from 'ramda/src/assocPath'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals
)

const usersPool = () => path(['users', 'usersPool'])
const usersPoolUser = (userId) => path(['users', 'usersPool', userId])
const user = () => path(['auth', 'user'])
const usersGetProfileCache = () => path(['users', 'usersGetProfileCache'])
const usersGetFollowedUsersCacheUser = (userId) => path(['users', 'usersGetFollowedUsersCache', userId])
const usersGetFollowerUsersCacheUser = (userId) => path(['users', 'usersGetFollowerUsersCache', userId])

/**
 *
 */
const usersGetProfile = () => path(['users', 'usersGetProfile'])

export const usersGetProfileSelector = (userId) => createDeepEqualSelector(
  [usersGetProfile(), usersPoolUser(userId)],
  (usersGetProfile, usersPoolUser) => usersPoolUser,
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
  [usersGetTrendingUsers(), usersPool()],
  (usersGetTrendingUsers, usersPool) => {
    const mappedUsers = pathOr([], ['data'])(usersGetTrendingUsers)
      .map(userId =>
        path([userId, 'data'])(usersPool)
      )
      .filter(user => user)
    return assocPath(['data'], mappedUsers)(usersGetTrendingUsers)
  },
)

/**
 *
 */
const usersSearch = () => path(['users', 'usersSearch'])

export const usersSearchSelector = () => createDeepEqualSelector(
  [usersSearch(), usersPool()],
  (usersSearch, usersPool) => {
    const mappedUsers = pathOr([], ['data'])(usersSearch)
      .map(userId =>
        path([userId, 'data'])(usersPool)
      )
      .filter(user => user)
    return assocPath(['data'], mappedUsers)(usersSearch)
  },
)

/**
 *
 */
const usersGetFollowedUsersWithStories = () => path(['users', 'usersGetFollowedUsersWithStories'])

export const usersGetFollowedUsersWithStoriesSelector = () => createDeepEqualSelector(
  [usersGetFollowedUsersWithStories(), usersPool()],
  (usersGetFollowedUsersWithStories, usersPool) => {
    const mappedUsers = pathOr([], ['data'])(usersGetFollowedUsersWithStories)
      .map(userId =>
        path([userId, 'data'])(usersPool)
      )
      .filter(user => user)
    return assocPath(['data'], mappedUsers)(usersGetFollowedUsersWithStories)
  },
)

/**
 *
 */
const usersGetPendingFollowers = () => path(['users', 'usersGetPendingFollowers'])

export const usersGetPendingFollowersSelector = () => createDeepEqualSelector(
  [usersGetPendingFollowers(), usersPool()],
  (usersGetPendingFollowers, usersPool) => {
    const mappedUsers = pathOr([], ['data'])(usersGetPendingFollowers)
      .map(userId =>
        path([userId, 'data'])(usersPool)
      )
      .filter(user => user)
    return assocPath(['data'], mappedUsers)(usersGetPendingFollowers)
  },
)