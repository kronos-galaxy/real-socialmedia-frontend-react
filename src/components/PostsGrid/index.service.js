import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import { useRoute } from '@react-navigation/native'
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

  console.log(postsGet)

  const postsGetRequest = ({ nextToken }) =>
    dispatch(postsActions.postsGetRequest({ userId, nextToken }))

  const postsGetMoreRequest = ({ nextToken }) =>
    dispatch(postsActions.postsGetMoreRequest({ userId, nextToken }))

  useEffect(() => {
    if (!postsGetRequestOnMount) return

    dispatch(postsActions.postsGetRequest({ userId }))
  }, [userId])

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
    user,
    postsGet,
    postsGetRequest,
    postsGetMoreRequest,
  })
}

export default PostsGridService
