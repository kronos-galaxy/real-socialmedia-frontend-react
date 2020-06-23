import { useSelector, useDispatch } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as authSelector from 'store/ducks/auth/selectors'
import * as authActions from 'store/ducks/auth/actions'
import { handleGallery } from 'components/Camera/index.service'
import * as cameraActions from 'store/ducks/camera/actions'
import * as navigationActions from 'navigation/actions'

const SettingsService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()

  const authSignout = useSelector(state => state.auth.authSignout)
  const user = useSelector(authSelector.authUserSelector)

  const authSignoutRequest = () => 
    dispatch(authActions.authSignoutRequest())

  const cameraCaptureRequest = (payload) =>
    dispatch(cameraActions.cameraCaptureRequest(payload))

  const handleLibrarySnap = async () => {
    const photos = await handleGallery('4:3', true)
  
    if (!photos.length) {
      return
    }
    
    cameraCaptureRequest(photos)
  
    if (route.params && route.params.nextRoute) {
      navigation.navigate(path(['params', 'nextRoute'])(route), { photos })
    } else {
      navigationActions.navigateProfilePhotoUpload(navigation, { type: 'IMAGE', photos })()
    }
  }

  return children({
    user,
    authSignout,
    authSignoutRequest,
    handleLibrarySnap,
  })
}

export default SettingsService
