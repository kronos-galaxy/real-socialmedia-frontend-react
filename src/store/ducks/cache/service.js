import RNFS from 'react-native-fs'
import priorityQueue from 'async/priorityQueue'

/**
 * 
 */
export const checkLocalImage = async (path) => {
  return await RNFS.exists(path)
}

export const stopRemoteImage = async (jobId) => {
  return await RNFS.exists(jobId)
}

/**
 * 
 */
export const fetchRemoteImage = async ({
  signature,
  progressCallback,
  requestCallback,
  failureCallback,
}, successCallback) => {
  await RNFS.mkdir(signature.pathFolder)

  const { promise, jobId } = RNFS.downloadFile({
    fromUrl: signature.source,
    toFile: signature.path,
    background: true,
    discretionary: true,
    cacheable: false,
    readTimeout: 25000,
    backgroundTimeout: 25000,
    progressDivider: 10,
    resumable: () =>
      RNFS.isResumable(jobId).then(() => RNFS.resumeDownload(jobId)),
    begin: requestCallback,
    progress: progressCallback,
  })

  try {
    const response = await promise
    await RNFS.completeHandlerIOS(jobId)

    successCallback({
      jobId,
      response,
      signature,
    })
  } catch (error) {
    failureCallback({
      jobId,
      response,
      signature,
    })
  }
}

export const priorityQueueInstance = priorityQueue(fetchRemoteImage, 3)

export const priorotizedRemoteImageFetch = ({
  signature,
  priority,
  progressCallback,
  requestCallback,
  successCallback,
  failureCallback,
}) => {
  priorityQueueInstance.push({
    signature,
    progressCallback,
    requestCallback,
    failureCallback,
  }, priority, successCallback)
}