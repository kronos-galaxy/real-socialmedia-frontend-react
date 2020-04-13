import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as postsActions from 'store/ducks/posts/actions'
import * as cameraActions from 'store/ducks/camera/actions'
import * as authActions from 'store/ducks/auth/actions'
import * as navigationActions from 'navigation/actions'
import { useNavigation } from '@react-navigation/native'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

const PostsGridSelectService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUserSelector)
  const usersImagePostsGet = useSelector(state => state.users.usersImagePostsGet)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)
  const postsCreateQueue = useSelector(state => state.posts.postsCreateQueue)
  const authUser = useSelector(state => state.auth.user)

  const postsCreateIdle = (payload) =>
    dispatch(postsActions.postsCreateIdle({ payload }))

  const usersImagePostsGetRequest = (payload) =>
    dispatch(usersActions.usersImagePostsGetRequest(payload))

  const usersEditProfileRequest = () =>
    dispatch(usersActions.usersEditProfileRequest({ photoPostId: selectedPost.postId }))

  useEffect(() => {
    usersImagePostsGetRequest({ userId: user.userId })
  }, [])

  useEffect(() => {
    if (usersEditProfile.status === 'success') {
      navigationActions.navigateProfileSelf(navigation)()
      dispatch(usersActions.usersEditProfileIdle())
    }
  }, [usersEditProfile.status])

  const [selectedPost, setSelectedPost] = useState({})
  const handlePostPress = (post) => setSelectedPost(post)

  /**
   * 
   */
  const cameraCapture = useSelector(state => state.camera.cameraCapture)

  const postsCreateRequest = ({
    albumId = null,
    postType = 'IMAGE',
    text = '',
    images = [],
    lifetime = '',
    commentsDisabled = false,
    likesDisabled = true,
    sharingDisabled = false,
    verificationHidden = false,
    takenInReal = false,
    originalFormat = 'jpg',
    originalMetadata = '',
  }) => {
    const postId = uuid()
    const mediaId = uuid()

    dispatch(postsActions.postsCreateRequest({
      postId,
      postType,
      albumId,
      lifetime,
      mediaId,
      text,
      images,
      commentsDisabled,
      likesDisabled,
      sharingDisabled,
      verificationHidden,
      takenInReal,
      originalFormat,
      originalMetadata,
      createdAt: dayjs().toJSON(),
      attempt: 0,
    }))

    if (postType === 'IMAGE') {
      dispatch(cameraActions.cameraCaptureIdle({ payload: { uri: images[0] } }))
    }

    dispatch(authActions.authCheckIdle({ nextRoute: 'Root' }))
  }

  const cameraCaptureIdle = (payload) =>
    dispatch(cameraActions.cameraCaptureIdle({ payload }))

  return children({
    user,
    usersImagePostsGet,
    usersImagePostsGetRequest,
    handlePostPress,
    selectedPost,
    usersEditProfileRequest,

    authUser,
    cameraCapture,
    postsCreateIdle,
    postsCreateRequest,
    postsCreateQueue,
    cameraCaptureIdle,
  })
}

export default PostsGridSelectService
