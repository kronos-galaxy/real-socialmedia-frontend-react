import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import { useRoute, useFocusEffect } from '@react-navigation/native'
import path from 'ramda/src/path'
import useS3ExpiryState from 'services/S3ExpiryState'
import * as authSelector from 'store/ducks/auth/selectors'
import * as postsSelector from 'store/ducks/posts/selectors'

const PostsGridService = ({ children, postsGetRequestOnMount }) => {
  const dispatch = useDispatch()
  const route = useRoute()

  const user = path(['params', 'user'])(route) || useSelector(authSelector.authUserSelector)
  const userId = user.userId

  const postsGet = useSelector(postsSelector.postsGetSelector(userId))
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const themes = useSelector(state => state.theme.themeFetch.data)

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

  const urlToBeValidated = path(['data', 0, 'image', 'url'])(postsGet)
  useS3ExpiryState({
    urlToBeValidated,
    condition: (
      urlToBeValidated &&
      postsGet.status !== 'loading'
    ),
    onExpiry: () => {
      dispatch(postsActions.postsGetRequest({ userId }))
    },
  })

  return children({
    themes,
    themeFetch,
    user,
    postsGet,
    postsGetRequest,
    postsGetMoreRequest,
  })
}

export default PostsGridService
