import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import { withNavigation } from 'react-navigation'

const PostMediaViewsService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const postId = navigation.getParam('postId')
  const postsViewsGet = useSelector(state => state.posts.postsViewsGet)
  const usersFollow = useSelector(state => state.users.usersFollow)
  const usersUnfollow = useSelector(state => state.users.usersUnfollow)
  const usersAcceptFollowerUser = useSelector(state => state.users.usersAcceptFollowerUser)

  const usersFollowRequest = ({ userId }) =>
    dispatch(usersActions.usersFollowRequest({ userId }))
  
  const usersUnfollowRequest = ({ userId }) =>
    dispatch(usersActions.usersUnfollowRequest({ userId }))
  
  const usersAcceptFollowerUserRequest = ({ userId }) =>
    dispatch(usersActions.usersAcceptFollowerUserRequest({ userId }))

  const postsViewsGetRequest = (payload) => 
    dispatch(postsActions.postsViewsGetRequest(payload))

  useEffect(() => {
    if (usersFollow.status === 'success') {
      postsViewsGetRequest({ postId })
    }
    if (usersUnfollow.status === 'success') {
      postsViewsGetRequest({ postId })
    }
  }, [usersFollow.status, usersUnfollow.status])

  useEffect(() => {
    postsViewsGetRequest({ postId })
  }, [])

  return children({
    postsViewsGet,
    postsViewsGetRequest,
    usersFollow,
    usersUnfollow,
    usersAcceptFollowerUser,
    usersFollowRequest,
    usersUnfollowRequest,
    usersAcceptFollowerUserRequest,
  })
}

export default withNavigation(PostMediaViewsService)
