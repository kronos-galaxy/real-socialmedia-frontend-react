import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as albumsActions from 'store/ducks/albums/actions'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import { withNavigation } from 'react-navigation'
import path from 'ramda/src/path'

const PostEditService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.auth.user)
  const postId = path(['postId'])(navigation.getParam('post'))
  const postsSingleGet = useSelector(state => state.posts.postsSingleGet)
  const postsEdit = useSelector(state => state.posts.postsEdit)
  const albumsGet = useSelector(state => state.albums.albumsGet)
  const albumsGetCache = useSelector(state => state.albums.albumsGetCache)

  useEffect(() => {
    dispatch(albumsActions.albumsGetRequest({ userId: authUser.userId }))
  }, [])

  const postsSingleGetRequest = ({ postId }) =>
    dispatch(postsActions.postsSingleGetRequest({ postId }))

  const postsEditRequest = (payload) =>
    dispatch(postsActions.postsEditRequest(payload))

  useEffect(() => {
    dispatch(postsActions.postsSingleGetRequest({ postId }))
  }, [postId])

  useEffect(() => {
    if (postsEdit.status === 'success') {
      dispatch(postsActions.postsEditIdle())
      navigation.goBack(null)
    }
  }, [postsEdit.status])

  return children({
    albumsGet: postsServices.cachedPostsGet(albumsGet, albumsGetCache, authUser.userId),
    postsSingleGet: postsServices.cachedPostsSingleGet(postsSingleGet, navigation.getParam('post')),
    postsSingleGetRequest,
    postsEdit,
    postsEditRequest,
  })
}

export default withNavigation(PostEditService)
