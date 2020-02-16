import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import { withNavigation } from 'react-navigation'
import useCounter from 'react-use/lib/useCounter'
import pathOr from 'ramda/src/pathOr'

const StoryService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const userId = navigation.getParam('user').userId
  const usersGetFollowedUsersWithStories = useSelector(state => state.users.usersGetFollowedUsersWithStories)

  const countStories = usersGetFollowedUsersWithStories.data.find(user => user.userId === userId).stories.items.length
  const [currentStory, { inc: nextStory, dec: prevStory, reset: resetStory }] = useCounter(0)

  useEffect(() => {
    dispatch(postsActions.postsStoriesGetRequest({ userId }))
    dispatch(usersActions.usersGetProfileRequest({ userId }))
  }, [])

  const storyRef = useRef(null)
  const userStoryIndex = usersGetFollowedUsersWithStories.data.findIndex(user => user.userId === userId)
  const nextUserStoryIndex = usersGetFollowedUsersWithStories.data[userStoryIndex + 1]
  const prevUserStoryIndex = usersGetFollowedUsersWithStories.data[userStoryIndex - 1]

  const onSnapItem = (index) => {
    navigation.setParams({
      user: usersGetFollowedUsersWithStories.data[index]
    })
    resetStory()
  }

  const onNextStory = () => {
    if (currentStory + 1 < countStories) {
      return nextStory()
    }

    if (nextUserStoryIndex) {
      navigation.setParams({
        user: nextUserStoryIndex
      })
      resetStory()
      storyRef.current.snapToNext()
    } else {
      resetStory()
      navigation.goBack()
    }
  }
    
  const onPrevStory = () => {
    if (currentStory > 0) {
      return prevStory()
    }
    
    if (prevUserStoryIndex) {
      navigation.setParams({
        user: prevUserStoryIndex
      })
      resetStory()
      storyRef.current.snapToPrev()
    } else {
      resetStory()
      navigation.goBack()
    }
  }

  const onCloseStory = () => {
    resetStory()
    navigation.navigate('Feed')
  }

  return children({
    storyRef,
    userId,
    usersGetFollowedUsersWithStories,
    countStories,
    currentStory,
    onNextStory,
    onPrevStory,
    onCloseStory,
    onSnapItem,
  })
}

export default withNavigation(StoryService)
