import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import * as navigationActions from 'navigation/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as authActions from 'store/ducks/auth/actions'
import {
  savePhotoValidation,
} from 'services/Auth'

const VerificationService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleBackAction = () => {
    dispatch(usersActions.usersEditProfileIdle({}))
    navigationActions.navigateBack(navigation)()
  }

  const handleHideAction = () => {
    savePhotoValidation()
    dispatch(usersActions.usersEditProfileIdle({}))
    dispatch(authActions.authCheckIdle({ nextRoute: 'Root' }))
  }

  const handleHomeAction = () => {
    dispatch(usersActions.usersEditProfileIdle({}))
    navigationActions.navigateBack(navigation)()
  }

  return children({
    handleBackAction,
    handleHideAction,
    handleHomeAction,
  })
}

export default VerificationService
