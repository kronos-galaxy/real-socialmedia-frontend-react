import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as albumsActions from 'store/ducks/albums/actions'
import { withNavigation } from 'react-navigation'
import uuid from 'uuid/v4'

const AlbumCreateService = ({ children, navigation }) => {
  const dispatch = useDispatch()
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
      navigation.goBack()
    }
  }, [albumsCreate.status])

  return children({
    authUser,
    albumsCreate,
    albumsCreateRequest,
  })
}

export default withNavigation(AlbumCreateService)
