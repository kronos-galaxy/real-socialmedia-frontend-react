import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authSelector from 'store/ducks/auth/selectors'
import * as datingActions from 'store/ducks/dating/actions'
import * as datingSelector from 'store/ducks/dating/selectors'
import path from 'ramda/src/path'

const DatingService = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUserSelector)
  const datingMatchedUsers = useSelector(datingSelector.datingMatchedUsersSelector())

  useEffect(() => {
    dispatch(datingActions.datingMatchedUsersRequest({ matchStatus: 'POTENTIAL' }))
  }, [])
  
  const datingMatchedUsersRequest = () =>
    dispatch(datingActions.datingMatchedUsersRequest({ matchStatus: 'POTENTIAL' }))

  const datingMatchedUsersIdle = () =>
    dispatch(datingActions.datingMatchedUsersIdle({}))

  const handleSwipedLeft = (index) => {
    const swipedUserId = path(['data', index, 'userId'], datingMatchedUsers)
    dispatch(datingActions.datingMatchRejectRequest({ userId: swipedUserId }))
  }

  const handleSwipedRight = (index) => {
    const swipedUserId = path(['data', index, 'userId'], datingMatchedUsers)
    dispatch(datingActions.datingMatchApproveRequest({ userId: swipedUserId }))
  }

  return children({
    user,
    datingMatchedUsersRequest,
    datingMatchedUsersIdle,
    datingMatchedUsers,
    handleSwipedLeft,
    handleSwipedRight,
  })
}

export default DatingService
