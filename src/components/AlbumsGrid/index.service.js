import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as albumsActions from 'store/ducks/albums/actions'
import { useRoute, useFocusEffect } from '@react-navigation/native'
import path from 'ramda/src/path'
import useS3ExpiryState from 'services/S3ExpiryState'
import * as authSelector from 'store/ducks/auth/selectors'
import * as albumsSelector from 'store/ducks/albums/selectors'

const AlbumsGridService = ({ children, albumsGetRequestOnMount }) => {
  const dispatch = useDispatch()
  const route = useRoute()

  const user = path(['params', 'user'])(route) || useSelector(authSelector.authUserSelector)
  const userId = user.userId

  const albumsGet = useSelector(albumsSelector.albumsGetSelector(userId))
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const themes = useSelector(state => state.theme.themeFetch.data)

  const albumsGetRequest = ({ nextToken }) =>
    dispatch(albumsActions.albumsGetRequest({ userId, nextToken }))

  const albumsGetMoreRequest = ({ nextToken }) =>
    dispatch(albumsActions.albumsGetMoreRequest({ userId, nextToken }))

  useFocusEffect(
    useCallback(() => {
      if (albumsGetRequestOnMount) {
        dispatch(albumsActions.albumsGetRequest({ userId }))
      }

      return () => {
        dispatch(albumsActions.albumsGetIdle({ payload: { userId } }))
      }
    }, [userId])
  )

  const urlToBeValidated = path(['data', 0, 'image', 'url'])(albumsGet)
  useS3ExpiryState({
    urlToBeValidated,
    condition: (
      urlToBeValidated &&
      albumsGet.status !== 'loading'
    ),
    onExpiry: () => {
      dispatch(albumsActions.albumsGetRequest({ userId }))
    },
  })

  return children({
    themes,
    themeFetch,
    user,
    albumsGet,
    albumsGetRequest,
    albumsGetMoreRequest,
  })
}

export default AlbumsGridService
