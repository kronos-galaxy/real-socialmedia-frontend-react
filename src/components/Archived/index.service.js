import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsSelector from 'store/ducks/posts/selectors'

const ProfileArchivedService = ({ children }) => {
  const dispatch = useDispatch()
  const postsGetArchived = useSelector(postsSelector.postsGetArchivedSelector())

  const postsGetArchivedRequest = () =>
    dispatch(postsActions.postsGetArchivedRequest())

  useEffect(() => {
    postsGetArchivedRequest()
  }, [])

  return children({
    postsGetArchived,
    postsGetArchivedRequest,
  })
}

export default ProfileArchivedService
