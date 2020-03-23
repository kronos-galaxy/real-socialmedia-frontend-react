import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as albumsActions from 'store/ducks/albums/actions'
import * as navigationActions from 'navigation/actions'

const AlbumService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const authUser = useSelector(state => state.auth.user)
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const themes = useSelector(state => state.theme.themeFetch.data)
  const albumsDelete = useSelector(state => state.albums.albumsDelete)

  const albumsDeleteRequest = (payload) =>
    dispatch(albumsActions.albumsDeleteRequest(payload))

  useEffect(() => {
    if (albumsDelete.status === 'success') {
      dispatch(albumsActions.albumsDeleteIdle())
      dispatch(albumsActions.albumsGetRequest({ userId: authUser.userId }))
      navigationActions.navigateBack(navigation)()
    }
  }, [albumsDelete.status])

  return children({
    authUser,
    themeFetch,
    themes,
    albumsDeleteRequest,
  })
}

export default AlbumService
