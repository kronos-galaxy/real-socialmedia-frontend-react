import { useSelector } from 'react-redux'
import { withNavigation } from 'react-navigation'

const UserService = ({ children, navigation }) => {
  const themeFetch = useSelector(state => state.theme.themeFetch)

  const handleProfilePress = (user) => () => {
    const themeSelector = (themeCode, themeFetch) =>
      (themeFetch.data.find(theme => theme.key === themeCode) || {}).theme

    navigation.push('FeedProfile', {
      ...user,
      theme: themeSelector(user.themeCode, themeFetch),
    })
  }

  return children({
    handleProfilePress,
  })
}

export default withNavigation(UserService)
