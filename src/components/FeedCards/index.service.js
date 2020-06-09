import { useSelector, useDispatch } from 'react-redux'
import * as navigationActions from 'navigation/actions'
import { useNavigation } from '@react-navigation/native'

const FeedCardsService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const usersGetCards = useSelector(state => state.users.usersGetCards)

  const handleCardPress = () =>
		navigationActions.navigateChat(navigation)()
 
  return children({
		usersGetCards,
		handleCardPress,
  })
}

export default FeedCardsService
