import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import path from 'ramda/src/path'
import useS3ExpiryState from 'services/S3ExpiryState'
import * as authSelector from 'store/ducks/auth/selectors'

const PostsGridService = ({ children, postsGetRequestOnMount }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const postsGet = useSelector(state => state.posts.postsGet)
  const postsGetCache = useSelector(state => state.posts.postsGetCache)
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const themes = useSelector(state => state.theme.themeFetch.data)
  const user = path(['params', 'user'])(route) || useSelector(authSelector.authUserSelector)
  const userId = user.userId

  const postsGetCached = postsServices.cachedPostsGet(postsGet, postsGetCache, userId)

  const postsGetRequest = ({ nextToken }) =>
    dispatch(postsActions.postsGetRequest({ userId, nextToken }))

  const postsGetMoreRequest = ({ nextToken }) =>
    dispatch(postsActions.postsGetMoreRequest({ userId, nextToken }))

  useFocusEffect(
    useCallback(() => {
      if (postsGetRequestOnMount) {
        dispatch(postsActions.postsGetRequest({ userId }))
      }

      return () => {
        dispatch(postsActions.postsGetIdle({ payload: { userId } }))
      }
    }, [userId])
  )

  const urlToBeValidated = path(['data', 0, 'image', 'url'])(postsGetCached)
  useS3ExpiryState({
    urlToBeValidated,
    condition: (
      urlToBeValidated &&
      postsGetCached.status !== 'loading'
    ),
    onExpiry: () => {
      dispatch(postsActions.postsGetRequest({ userId }))
    },
  })

  return children({
    themes,
    themeFetch,
    user,
    postsGet: postsGetCached,
    postsGetRequest,
    postsGetMoreRequest,
  })
}

export default PostsGridService
