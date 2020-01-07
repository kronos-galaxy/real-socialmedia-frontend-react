import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import { withNavigation } from 'react-navigation'

const PostsService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.auth.user)
  const postsGet = useSelector(state => state.posts.postsGet)
  const postsGetCache = useSelector(state => state.posts.postsGetCache)
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const userId = navigation.getParam('userId') || authUser.userId

  const postsGetRequest = ({ nextToken }) =>
    dispatch(postsActions.postsGetRequest({ userId, nextToken }))

  const postsGetMoreRequest = ({ nextToken }) =>
    dispatch(postsActions.postsGetMoreRequest({ userId, nextToken }))

  useEffect(() => {
    dispatch(postsActions.postsGetRequest({ userId }))
  }, [userId])

  return children({
    authUser,
    themeFetch,
    postsGet: postsServices.cachedPostsGet(postsGet, postsGetCache, userId),
    postsGetRequest,
    postsGetMoreRequest,
  })
}

export default withNavigation(PostsService)
