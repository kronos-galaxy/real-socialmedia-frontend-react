import { useSelector } from 'react-redux'

const UserService = ({ children, navigation }) => {
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const themeSelector = (themeCode, themeFetch) =>
    (themeFetch.data.find(theme => theme.key === themeCode) || {}).theme

  const handleProfilePress = (user) => {
    const theme = themeSelector(user.themeCode, themeFetch)
    return () => {
      navigation.navigate({
        routeName: 'FeedProfile',
        params: {
          ...user,
          theme,
        },
        key: `PostMedia-postid${user.userId}`,
      })
    }
  }

  return children({
    handleProfilePress,
  })
}

export default UserService
