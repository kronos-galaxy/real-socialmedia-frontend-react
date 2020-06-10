import { Linking } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as navigationActions from 'navigation/actions'
import { useNavigation } from '@react-navigation/native'
import * as usersActions from 'store/ducks/users/actions'

const FeedCardsService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const usersGetCards = useSelector(state => state.users.usersGetCards)
  const usersDeleteCard = useSelector(state => state.users.usersDeleteCard)

  const usersDeleteCardRequest = (payload) =>
    dispatch(usersActions.usersDeleteCardRequest(payload))

  const handleCardPress = ({ action }) =>
		Linking.openURL(action)
 
  return children({
		usersGetCards,
		handleCardPress,
		usersDeleteCardRequest,
  })
}

export default FeedCardsService
