import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as usersServices from 'store/ducks/users/services'
import * as postsActions from 'store/ducks/posts/actions'
import { withNavigation } from 'react-navigation'

const ProfileService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.auth.user)
  const usersGetProfileSelf = useSelector(state => state.users.usersGetProfileSelf)
  const postsStoriesGet = useSelector(state => state.posts.postsStoriesGet)
  const userId = authUser.userId

  const usersGetProfileSelfRequest = ({ userId }) => 
    dispatch(usersActions.usersGetProfileSelfRequest({ userId }))

  const postsStoriesGetRequest = ({ userId }) =>
    dispatch(postsActions.postsStoriesGetRequest({ userId }))

  useEffect(() => {
    usersGetProfileSelfRequest({ userId })
    postsStoriesGetRequest({ userId })
  }, [userId])

  return children({
    authUser,
    usersGetProfile: usersServices.cachedUsersGetProfileSelf(usersGetProfileSelf, authUser),
    usersGetProfileSelfRequest,
    postsStoriesGet,
    postsStoriesGetRequest,
  })
}

export default withNavigation(ProfileService)
