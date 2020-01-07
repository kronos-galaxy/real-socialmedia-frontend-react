import { useSelector, useDispatch } from 'react-redux'
import * as authSelector from 'store/ducks/auth/selectors'
import * as authActions from 'store/ducks/auth/actions'
import { withNavigation } from 'react-navigation'

const SettingsService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const authSignout = useSelector(state => state.auth.authSignout)
  const user = useSelector(authSelector.authUserSelector)

  const authSignoutRequest = () => 
    dispatch(authActions.authSignoutRequest())

  return children({
    user,
    authSignout,
    authSignoutRequest,
  })
}

export default withNavigation(SettingsService)
