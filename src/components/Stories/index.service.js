import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import { withNavigation } from 'react-navigation'

const StoriesService = ({ children }) => {
  const dispatch = useDispatch()
  const usersGetFollowedUsersWithStories = useSelector(state => state.users.usersGetFollowedUsersWithStories)
  const authUser = useSelector(state => state.auth.user)

  const usersGetFollowedUsersWithStoriesRequest = () =>
    dispatch(usersActions.usersGetFollowedUsersWithStoriesRequest())

    useEffect(() => {
    dispatch(usersActions.usersGetFollowedUsersWithStoriesRequest())
  }, [])

  return children({
    authUser,
    usersGetFollowedUsersWithStories,
    usersGetFollowedUsersWithStoriesRequest,
  })
}

export default withNavigation(StoriesService)
