import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import * as navigationActions from 'navigation/actions'
import * as cameraActions from 'store/ducks/camera/actions'
import useCamera from 'services/providers/Camera'

const PostTypeService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleProcessedPhoto = (payload) => {
    dispatch(cameraActions.cameraCaptureRequest(payload))
    navigationActions.navigatePostCreate(navigation, ({ type: 'IMAGE', photos: [payload[0].preview] }))()
  }

  const camera = useCamera({
    handleProcessedPhoto,
  })

  return children({
    handleLibrarySnap: camera.handleLibrarySnap,
  })
}

export default PostTypeService
