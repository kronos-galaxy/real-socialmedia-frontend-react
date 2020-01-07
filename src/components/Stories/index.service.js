import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import { withNavigation } from 'react-navigation'

const StoriesService = ({ children }) => {
  const dispatch = useDispatch()
  const usersGetFollowedUsersWithStories = useSelector(state => state.users.usersGetFollowedUsersWithStories)
  const usersStoriesGet = useSelector(state => state.users.usersStoriesGet)
  const authUser = useSelector(state => state.auth.user)

  const usersGetFollowedUsersWithStoriesRequest = () =>
    dispatch(usersActions.usersGetFollowedUsersWithStoriesRequest())

  const usersStoriesGetRequest = () =>
    dispatch(usersActions.usersStoriesGetRequest({ userId: authUser.userId }))

  useEffect(() => {
    dispatch(usersActions.usersStoriesGetRequest({ userId: authUser.userId }))
    dispatch(usersActions.usersGetFollowedUsersWithStoriesRequest())
  }, [])

  return children({
    authUser,
    usersStoriesGet,
    usersStoriesGetRequest,
    usersGetFollowedUsersWithStories,
    usersGetFollowedUsersWithStoriesRequest,
  })
}

export default withNavigation(StoriesService)
