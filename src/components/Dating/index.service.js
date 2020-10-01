import { useSelector, useDispatch } from 'react-redux'
import * as authSelector from 'store/ducks/auth/selectors'
import * as usersActions from 'store/ducks/users/actions'

const DatingService = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUserSelector)
  
  const usersSetUserDatingStatusRequest = () =>
    dispatch(usersActions.usersSetUserDatingStatusRequest({ status: 'ENABLED' }))

  const isDatingAvailable = (
    user.dateOfBirth &&
    user.gender &&
    user.location &&
    user.matchAgeRange &&
    user.matchGenders &&
    user.matchLocationRadius && 
    user.fullName &&

    /**
     * No default photos allowed
     */
    !user.photo.url.includes('placeholder')
  )

  const isDatingAvailableDebug = JSON.stringify({
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    location: user.location,
    matchAgeRange: user.matchAgeRange,
    matchGenders: user.matchGenders,
    matchLocationRadius: user.matchLocationRadius ,
    fullName: user.fullName,
    photo: !user.photo.url.includes('placeholder'),    
  }, null, 2)

  return children({
    user,
    usersSetUserDatingStatusRequest,
    isDatingAvailable,
    isDatingAvailableDebug,
  })
}

export default DatingService
