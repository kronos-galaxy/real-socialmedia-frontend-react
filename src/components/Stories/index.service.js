import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'

const StoriesService = ({ children }) => {
  const dispatch = useDispatch()
  const usersGetFollowedUsersWithStories = useSelector(state => state.users.usersGetFollowedUsersWithStories)
  const authUser = useSelector(state => state.auth.user)

  const usersGetFollowedUsersWithStoriesRequest = () =>
    dispatch(usersActions.usersGetFollowedUsersWithStoriesRequest())

  return children({
    authUser,
    usersGetFollowedUsersWithStories,
    usersGetFollowedUsersWithStoriesRequest,
  })
}

export default StoriesService
