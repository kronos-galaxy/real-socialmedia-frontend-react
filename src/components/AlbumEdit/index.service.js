import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as albumsActions from 'store/ducks/albums/actions'
import { useNavigation } from '@react-navigation/native'
import * as navigationActions from 'navigation/actions'

const AlbumEditService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const authUser = useSelector(state => state.auth.user)
  const albumsEdit = useSelector(state => state.albums.albumsEdit)

  const albumsEditRequest = (payload) =>
    dispatch(albumsActions.albumsEditRequest(payload))

  useEffect(() => {
    if (albumsEdit.status === 'success') {
      dispatch(albumsActions.albumsEditIdle())
      dispatch(albumsActions.albumsGetRequest({ userId: authUser.userId }))
      navigationActions.navigateBack(navigation)()
    }
  }, [albumsEdit.status])

  return children({
    authUser,
    albumsEdit,
    albumsEditRequest,
  })
}

export default AlbumEditService
