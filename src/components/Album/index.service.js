import { useSelector } from 'react-redux'
import { withNavigation } from 'react-navigation'

const AlbumService = ({ children, navigation }) => {
  const authUser = useSelector(state => state.auth.user)
  const themeFetch = useSelector(state => state.theme.themeFetch)

  return children({
    authUser,
    themeFetch,
  })
}

export default withNavigation(AlbumService)
