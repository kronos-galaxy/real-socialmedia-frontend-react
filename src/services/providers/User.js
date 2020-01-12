import { useSelector } from 'react-redux'
import { withNavigation } from 'react-navigation'

const UserService = ({ children, navigation }) => {
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const themeSelector = (themeCode, themeFetch) =>
    (themeFetch.data.find(theme => theme.key === themeCode) || {}).theme

  const handleProfilePress = (user) => {
    const theme = themeSelector(user.themeCode, themeFetch)
    return () => {
      navigation.push('FeedProfile', {
        ...user,
        theme,
      })
    }
  }

  return children({
    handleProfilePress,
  })
}

export default withNavigation(UserService)
