import { createSelectorCreator, defaultMemoize } from 'reselect'
import update from 'immutability-helper'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import equals from 'ramda/src/equals'
import assocPath from 'ramda/src/assocPath'
import * as normalizer from 'normalizer/schemas'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals
)

const entities = () => path(['entities'])
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
  [usersGetProfile(), entities()],
  (usersGetProfile, entities) => {
    const denormalized = normalizer.denormalizeUserGet(usersGetProfile.data, entities)
    return assocPath(['data'], denormalized)(usersGetProfile)
  }
)

/**
 *
 */
const usersGetProfileSelf = () => path(['users', 'usersGetProfileSelf'])

export const usersGetProfileSelfSelector = () => createDeepEqualSelector(
  [usersGetProfileSelf(), entities()],
  (usersGetProfileSelf, entities) => {
    const denormalized = normalizer.denormalizeUserGet(usersGetProfileSelf.data, entities)
    return assocPath(['data'], denormalized)(usersGetProfileSelf)
  }
)

/**
 *
 */
const usersGetFollowedUsers = () => path(['users', 'usersGetFollowedUsers'])

export const usersGetFollowedUsersSelector = (userId) => createDeepEqualSelector(
  [usersGetFollowedUsers(), entities()],
  (usersGetFollowedUsers, entities) => {
    const denormalized = normalizer.denormalizeUsersGet(usersGetFollowedUsers.data, entities)
    return assocPath(['data'], denormalized)(usersGetFollowedUsers)
  }
)

/**
 *
 */
const usersGetFollowerUsers = () => path(['users', 'usersGetFollowerUsers'])

export const usersGetFollowerUsersSelector = (userId) => createDeepEqualSelector(
  [usersGetFollowerUsers(), entities()],
  (usersGetFollowerUsers, entities) => {
    const denormalized = normalizer.denormalizeUsersGet(usersGetFollowerUsers.data, entities)
    return assocPath(['data'], denormalized)(usersGetFollowerUsers)
  }
)

/**
 *
 */
const usersGetTrendingUsers = () => path(['users', 'usersGetTrendingUsers'])

export const usersGetTrendingUsersSelector = () => createDeepEqualSelector(
  [usersGetTrendingUsers(), entities()],
  (usersGetTrendingUsers, entities) => {
    const denormalized = normalizer.denormalizeUsersGet(usersGetTrendingUsers.data, entities)
    return assocPath(['data'], denormalized)(usersGetTrendingUsers)
  }
)

/**
 *
 */
const usersSearch = () => path(['users', 'usersSearch'])

export const usersSearchSelector = () => createDeepEqualSelector(
  [usersSearch(), entities()],
  (usersSearch, entities) => {
    const denormalized = normalizer.denormalizeUsersGet(usersSearch.data, entities)
    return assocPath(['data'], denormalized)(usersSearch)
  }
)

/**
 *
 */
const usersGetFollowedUsersWithStories = () => path(['users', 'usersGetFollowedUsersWithStories'])

export const usersGetFollowedUsersWithStoriesSelector = () => createDeepEqualSelector(
  [usersGetFollowedUsersWithStories(), entities()],
  (usersGetFollowedUsersWithStories, entities) => {
    const denormalized = normalizer.denormalizeUsersGet(usersGetFollowedUsersWithStories.data, entities)
    return assocPath(['data'], denormalized)(usersGetFollowedUsersWithStories)
  }
)

/**
 *
 */
const usersGetPendingFollowers = () => path(['users', 'usersGetPendingFollowers'])

export const usersGetPendingFollowersSelector = () => createDeepEqualSelector(
  [usersGetPendingFollowers(), entities()],
  (usersGetPendingFollowers, entities) => {
    const denormalized = normalizer.denormalizeUsersGet(usersGetPendingFollowers.data, entities)
    return assocPath(['data'], denormalized)(usersGetPendingFollowers)
  }
)

const usersImagePostsGet = () => path(['users', 'usersGetPendingFollowers'])

export const usersImagePostsGetSelector = () => createDeepEqualSelector(
  [usersImagePostsGet(), entities()],
  (usersImagePostsGet, entities) => {
    const denormalized = normalizer.denormalizePostsGet(usersImagePostsGet.data, entities)
    return assocPath(['data'], denormalized)(usersImagePostsGet)
  }
)