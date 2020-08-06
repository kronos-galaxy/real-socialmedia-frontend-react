import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import useToggle from 'react-use/lib/useToggle'
import { useNavigation, useRoute } from '@react-navigation/native'
import CropPicker from 'react-native-image-crop-picker'
import { getScreenAspectRatio } from 'services/Dimensions'
import mapSeries from 'async/mapSeries'
import path from 'ramda/src/path'
import * as AssetService from 'services/Asset'

export const useCameraState = () => {
  const postsCreate = useSelector(state => state.posts.postsCreate)
  const [flashMode, handleFlashToggle] = useToggle(false)
  const [flipMode, handleFlipToggle] = useToggle(false)
  const [photoSize, setPhotoSize] = useState('4:3')

  return ({
    postsCreate,
    flashMode,
    handleFlashToggle,
    flipMode,
    handleFlipToggle,
    photoSize,
    setPhotoSize,
  })
}

const useCamera = ({
  handleProcessedPhoto = () => {},
}) => {
  const cameraState = useCameraState()
  const cameraRef = useRef(null)

  /**
   *
   */
  const cameraOptions = () => ({
    quality: 1,
    base64: false,
    writeExif: true,
    exif: true,
    mirrorImage: false,
  })

  const cropperOptions = (state, snappedPhoto) => ({
    avoidEmptySpaceAroundImage: false,
    path: snappedPhoto.path || snappedPhoto.uri,
    width: getScreenAspectRatio(state.photoSize, snappedPhoto.width).x,
    height: getScreenAspectRatio(state.photoSize, snappedPhoto.width).y,
    includeExif: true,
    compressImageQuality: 1,
  })

  const requestPayload = (type = gallery) => (state, snappedPhoto, croppedPhoto) => ({
    uri: (snappedPhoto.uri || snappedPhoto.path).replace('file://', ''),
    preview: (croppedPhoto.path || croppedPhoto.path).replace('file://', ''),
    originalFormat: snappedPhoto.extension || 'jpg',
    imageFormat: snappedPhoto.format || 'JPEG',
    crop: AssetService.generateCroppedCoordinates(croppedPhoto.cropRect),
    originalMetadata: JSON.stringify(snappedPhoto.exif),
    takenInReal: type === 'camera',
    photoSize: state.photoSize,
  })

  /**
   *
   */
  const handleCameraSnap = async () => {
    if (!cameraRef.current) return
    cameraRef.current.pausePreview()
    const snappedPhoto = await cameraRef.current.takePictureAsync(cameraOptions())
    const croppedPhoto = await CropPicker.openCropper(cropperOptions(cameraState, snappedPhoto))
    const payload = await requestPayload('camera')(cameraState, snappedPhoto, croppedPhoto)
    handleProcessedPhoto([payload])
    cameraRef.current.resumePreview()
  }

  const mapCropperResponse = async (selected, processor) => {
    const responses = Array.isArray(selected) ? selected : [selected] 
    const mapped = await mapSeries(responses, processor)
    return mapped.filter(item => item)
  }

  /**
   *
   */
  const pickerOptions = (multiple) => ({
    multiple: Boolean(multiple),
    avoidEmptySpaceAroundImage: false,
    mediaType: 'photo',
    includeExif: true,
    compressImageQuality: 1,
  })

  const handleLibrarySnap = async (multiple = false) => {
    const selectedMedia = await CropPicker.openPicker(pickerOptions(multiple))
    const payloadSeries = await mapCropperResponse(selectedMedia, async (selectedPhoto, callback) => {
      const tempPhoto = await AssetService.getAssetFileAbsolutePath(selectedPhoto.localIdentifier, selectedPhoto.filename)
      const snappedPhoto = ({ ...selectedPhoto, ...tempPhoto })
      const croppedPhoto = await CropPicker.openCropper(cropperOptions(cameraState, selectedPhoto))
      const payload = requestPayload('gallery')(cameraState, snappedPhoto, croppedPhoto)
      callback(null, payload)
    })

    return handleProcessedPhoto(payloadSeries)
  }

  return ({
    handleCameraSnap,
    handleLibrarySnap,
    cameraRef,
    ...cameraState
  })
}

export default useCamera
