import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as usersServices from 'store/ducks/users/services'
import { withNavigation } from 'react-navigation'
import useCounter from 'react-use/lib/useCounter'
import path from 'ramda/src/path'

const StoryService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const userId = navigation.getParam('userId')
  const postsStoriesGet = useSelector(state => state.posts.postsStoriesGet)
  const usersGetProfile = useSelector(state => state.users.usersGetProfile)
  const usersGetProfileCache = useSelector(state => state.users.usersGetProfileCache)

  const countStories = path(['data', 'length'])(postsStoriesGet) || 0
  const [currentStory, { inc: nextStory, dec: prevStory, reset: resetStory }] = useCounter(0)

  const postsStoriesGetRequest = () =>
    dispatch(postsActions.postsStoriesGetRequest({ userId }))

  useEffect(() => {
    dispatch(postsActions.postsStoriesGetRequest({ userId }))
    dispatch(usersActions.usersGetProfileRequest({ userId }))
  }, [])

  const onNextStory = () => {
    if (currentStory + 1 < countStories) {
      nextStory()
    } else {
      resetStory()
      navigation.navigate('Feed')
    }
  }
    
  const onPrevStory = () => {
    if (currentStory > 0) {
      prevStory()
    } else {
      resetStory()
      navigation.navigate('Feed')
    }
  }

  const onCloseStory = () => {
    resetStory()
    navigation.navigate('Feed')
  }

  return children({
    postsStoriesGet,
    postsStoriesGetRequest,
    usersGetProfile: usersServices.cachedUsersGetProfile(usersGetProfile, usersGetProfileCache, navigation),
    countStories,
    currentStory,
    onNextStory,
    onPrevStory,
    onCloseStory,
  })
}

export default withNavigation(StoryService)
