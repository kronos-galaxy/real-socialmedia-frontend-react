import { createSelectorCreator, defaultMemoize } from 'reselect'
import update from 'immutability-helper'
import path from 'ramda/src/path'
import equals from 'ramda/src/equals'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals
)

const albumsGet = () => path(['albums', 'albumsGet'])
const albumsGetCache = (userId) => path(['albums', 'albumsGetCache', userId])

export const albumsGetSelector = (userId) => createDeepEqualSelector(
  [albumsGet(userId), albumsGetCache(userId)],
  (albumsGet, albumsGetCache) => albumsGetCache || albumsGet,
)