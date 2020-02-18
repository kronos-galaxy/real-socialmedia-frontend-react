import { AppState } from 'react-native'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useToggle from 'react-use/lib/useToggle'
import * as cameraActions from 'store/ducks/camera/actions'
import { withNavigation } from 'react-navigation'
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions'
import CropPicker from 'react-native-image-crop-picker'
import { getScreenAspectRatio } from 'services/Camera'
import series from 'async/series'

const cameraManager = (cameraRef) => ({
  resumePreview: props => {
    try {
      return cameraRef.current.resumePreview(props)
    } catch (error) {
    }
  },
  pausePreview: props => {
    try {
      return cameraRef.current.pausePreview(props)
    } catch (error) {
    }
  },
  takePictureAsync: props => {
    try {
      return cameraRef.current.takePictureAsync(props)
    } catch (error) {
    }
  },
})

const CameraService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const postsCreate = useSelector(state => state.posts.postsCreate)
  
  const [flashMode, handleFlashToggle] = useToggle(false)
  const [flipMode, handleFlipToggle] = useToggle(false)

  const cameraCaptureRequest = (payload) =>
    dispatch(cameraActions.cameraCaptureRequest(payload))

  const cameraCaptureIdle = (payload) =>
    dispatch(cameraActions.cameraCaptureIdle(payload))

  const cameraRef = useRef(null)
  const camera = cameraManager(cameraRef)
  const [cameraEnabled, setCameraEnabled] = useState(true)

  const checkCameraPermissions = async () => {
    const result = await check(PERMISSIONS.IOS.CAMERA)
    setCameraEnabled(result !== RESULTS.BLOCKED)
  }

  const appStateListener = (nextAppState) => {
    if (nextAppState === 'active') {
      camera.resumePreview()
    }
    if (nextAppState === 'background') {
      camera.pausePreview()
    }
    checkCameraPermissions()
  }

  useEffect(() => {
    checkCameraPermissions()
    AppState.addEventListener('change', appStateListener)
    navigation.addListener('didFocus', appStateListener)
    return () => {
      AppState.removeEventListener('change', appStateListener)
      navigation.addListener('didFocus', appStateListener)
    }
  }, [])

  const handleClosePress = () => {
    navigation.navigate('Feed')
  }

  const [photoSize, setPhotoSize] = useState('4:3')
  const [photoQuality, setPhotoQuality] = useState('default')

  const handleCameraSnap = async () => {
    if (!cameraRef.current) { return }

    cameraCaptureIdle()
    
    camera.pausePreview()

    const quality = (() => {
      if (photoQuality === 'maximum') {
        return 1
      }
      if (photoQuality === 'default') {
        return 0.6
      }
      return 1
    })()

    try {
      const snappedPhoto = await camera.takePictureAsync({
        quality,
        base64: false,
      })

      const croppedPhoto = await CropPicker.openCropper({
        avoidEmptySpaceAroundImage: false,
        path: snappedPhoto.uri,
        width: getScreenAspectRatio(photoSize, snappedPhoto.width).x,
        height: getScreenAspectRatio(photoSize, snappedPhoto.width).y,
        includeExif: true,
        compressImageQuality: 1,
      })
  
      cameraCaptureRequest([{
        uri: croppedPhoto.path,
        photoSize,
        takenInReal: true,
        originalFormat: snappedPhoto.uri.split('.').pop(),
      }])
  
      navigation.navigate(navigation.getParam('nextRoute') || 'PostCreate', { photos: [croppedPhoto.path] })
    } catch (error) {

    } finally {
      camera.resumePreview()
    }
  }

  const handleLibrarySnap = async () => {
    const responses = await CropPicker.openPicker({
      multiple: true,
    })

    const cropped = await series(
      responses.map(response => (callback) =>
        CropPicker.openCropper({
          avoidEmptySpaceAroundImage: false,
          path: response.path,
          width: getScreenAspectRatio(photoSize, response.width).x,
          height: getScreenAspectRatio(photoSize, response.width).y,
          includeExif: true,
          compressImageQuality: 1,
        })
        .then(res => ({ ...res, originalFormat: response.filename.split('.').pop() }))
        .then(res => callback(null, res))
        .catch(callback)
      )
    )

    const photos = cropped.map(photo => ({
      uri: photo.path,
      photoSize,
      takenInReal: false,
      originalFormat: photo.originalFormat,
    }))

    cameraCaptureRequest(photos)
    navigation.navigate(navigation.getParam('nextRoute') || 'PostCreate', { photos })
  }

  return children({
    postsCreate,
    cameraRef,
    photoSize,
    setPhotoSize,
    photoQuality,
    setPhotoQuality,
    flashMode,
    flipMode,
    handleClosePress,
    handleLibrarySnap,
    handleCameraSnap,
    handleLibrarySnap,
    handleFlashToggle,
    handleFlipToggle,
    cameraEnabled,
  })
}

export default withNavigation(CameraService)
