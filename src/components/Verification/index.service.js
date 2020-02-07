import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import { withNavigation } from 'react-navigation'
import path from 'ramda/src/path'

const VerificationService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const postId = path(['postId'])(navigation.getParam('post'))
  const authUser = useSelector(state => state.auth.user)
  const postsSingleGet = useSelector(state => state.posts.postsSingleGet)

  const postsSingleGetRequest = ({ postId }) =>
    dispatch(postsActions.postsSingleGetRequest({ postId }))

  useEffect(() => {
    dispatch(postsActions.postsSingleGetRequest({ postId }))
  }, [postId])

  return children({
    authUser,
    postsSingleGet: postsServices.cachedPostsSingleGet(postsSingleGet, navigation.getParam('post')),
    postsSingleGetRequest,
  })
}

export default withNavigation(VerificationService)
