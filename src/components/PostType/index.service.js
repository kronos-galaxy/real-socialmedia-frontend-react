import { useNavigation, useRoute } from '@react-navigation/native'
import * as navigationActions from 'navigation/actions'
import { handleGallery } from 'components/Camera/index.service'

const PostTypeService = ({ children, }) => {
  const navigation = useNavigation()
  const route = useRoute()
  
  const handleLibrarySnap = async () => {
    const photos = await handleGallery()
  
    if (!photos.length) {
      return
    }
    
    cameraCaptureRequest(photos)
  
    if (route.params && route.params.nextRoute) {
      navigation.navigate(path(['params', 'nextRoute'])(route), { photos })
    } else {
      navigationActions.navigatePostCreate(navigation, { type: 'IMAGE', photos })()
    }
  }

  return children({
    handleLibrarySnap,
  })
}

export default PostTypeService
