import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as albumsActions from 'store/ducks/albums/actions'
import { useNavigation } from '@react-navigation/native'
import { v4 as uuid } from 'uuid'
import * as navigationActions from 'navigation/actions'

const AlbumCreateService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const authUser = useSelector(state => state.auth.user)
  const albumsCreate = useSelector(state => state.albums.albumsCreate)

  const albumsCreateRequest = (payload) => {
    const albumId = uuid()
    dispatch(albumsActions.albumsCreateRequest({
      albumId,
      ...payload,
    }))
  }

  useEffect(() => {
    if (albumsCreate.status === 'success') {
      dispatch(albumsActions.albumsCreateIdle())
      dispatch(albumsActions.albumsGetRequest({ userId: authUser.userId }))
      navigationActions.navigateBack(navigation)()
    }
  }, [albumsCreate.status])

  return children({
    authUser,
    albumsCreate,
    albumsCreateRequest,
  })
}

export default AlbumCreateService
