import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import { withNavigation } from 'react-navigation'

const PostEditService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const postId = navigation.getParam('postId')
  const postsSingleGet = useSelector(state => state.posts.postsSingleGet)
  const postsEdit = useSelector(state => state.posts.postsEdit)

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
    postsSingleGet: postsServices.cachedPostsSingleGet(postsSingleGet, navigation),
    postsSingleGetRequest,
    postsEdit,
    postsEditRequest,
  })
}

export default withNavigation(PostEditService)
