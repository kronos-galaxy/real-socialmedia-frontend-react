import { Linking } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as navigationActions from 'navigation/actions'
import { useNavigation } from '@react-navigation/native'
import * as usersActions from 'store/ducks/users/actions'

const FeedCardsService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const usersGetCards = useSelector(state => state.users.usersGetCards)

  const usersDeleteCardRequest = (payload) =>
    dispatch(usersActions.usersDeleteCardRequest(payload))

  const handleCardPress = ({ action, cardId }) => {
    dispatch(usersActions.usersDeleteCardRequest({ cardId }))

    if (action === 'https://real.app/chat/') {
      navigationActions.navigateChat(navigation)()
    } if (action.includes('https://real.app/chat/post/')) {
      const post = { postId: action.split('https://real.app/chat/post/')[1] }
      navigationActions.navigatePostMedia(navigation,{ postId: post.postId, userId: post.postedBy.userId })()
    } else {
      Linking.openURL(action)
    }
  }
 
  return children({
		usersGetCards,
		handleCardPress,
		usersDeleteCardRequest,
  })
}

export default FeedCardsService
