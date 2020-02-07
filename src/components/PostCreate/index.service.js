import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import uuid from 'uuid/v4'
import * as authSelector from 'store/ducks/auth/selectors'
import * as postsActions from 'store/ducks/posts/actions'
import * as cameraActions from 'store/ducks/camera/actions'
import * as albumsActions from 'store/ducks/albums/actions'
import * as postsServices from 'store/ducks/posts/services'
import { withNavigation } from 'react-navigation'
import path from 'ramda/src/path'
import dayjs from 'dayjs'

const PostCreateService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUserSelector)
  const postsCreate = useSelector(state => state.posts.postsCreate)
  const cameraCapture = useSelector(state => state.camera.cameraCapture)
  const albumsGet = useSelector(state => state.albums.albumsGet)
  const albumsGetCache = useSelector(state => state.albums.albumsGetCache)

  useEffect(() => {
    dispatch(albumsActions.albumsGetRequest({ userId: user.userId }))
  }, [])
  
  const postsCreateRequest = ({
    albumId = null,
    text = '',
    lifetime = '',
    commentsDisabled = true,
    likesDisabled = true,
    sharingDisabled = true,
    verificationHidden = false,
  }) => {
    const postId = uuid()
    const mediaId = uuid()

    dispatch(postsActions.postsCreateRequest({
      postId,
      albumId,
      lifetime,
      mediaId,
      text,
      images: [path(['data', 'uri'])(cameraCapture)],
      commentsDisabled,
      likesDisabled,
      sharingDisabled,
      verificationHidden,
      takenInReal: path(['data', 'takenInReal'])(cameraCapture),
      originalFormat: path(['data', 'originalFormat'])(cameraCapture),
      createdAt: dayjs().toJSON(),
      attempt: 0,
    }))
    dispatch(cameraActions.cameraCaptureIdle())
    navigation.navigate('Feed')
  }

  const handleClosePress = () => {
    navigation.navigate('Feed')
  }

  return children({
    albumsGet: postsServices.cachedPostsGet(albumsGet, albumsGetCache, user.userId),
    user,
    postsCreate,
    postsCreateRequest,
    handleClosePress,
    cameraCapture,
  })
}

export default withNavigation(PostCreateService)
