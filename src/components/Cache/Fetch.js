import RNFS from 'react-native-fs'
import qs from 'query-string'
import priorityQueue from 'async/priorityQueue'

/**
 * 
 */
const generateSignature = (source) => {
  if (typeof source !== 'string' || !source.length) {
    return {
      partial: '',
      path: '',
      isRemote: '',
    }
  }

  const partial = qs.parseUrl(source).url.split('cloudfront.net')[1].replace(':', '-')
  const isRemote = source.includes('http://') || source.includes('https://')
  const path = isRemote ? `${RNFS.CachesDirectoryPath}/REAL${partial}` : source
  const pathFolder = path.substring(0, path.lastIndexOf('/'))

  return {
    source,
    partial,
    path,
    pathFolder,
    isRemote,
  }
}

/**
 * 
 */
export const checkLocalImage = async (signature) => {
  return await RNFS.exists(signature.path)
}

const downloads = new Map()

/**
 * 
 */
export const fetchRemoteImage = async ({ signature, progressCallback, beginCallback }) => {
  await RNFS.mkdir(signature.pathFolder)

  const { promise, jobId } = RNFS.downloadFile({
    fromUrl: signature.source,
    toFile: signature.path,
    background: true,
    discretionary: true,
    cacheable: false,
    readTimeout: 6000,
    backgroundTimeout: 12000,
    resumable: () =>
      RNFS.isResumable(jobId).then(() => RNFS.resumeDownload(jobId)),
    begin: beginCallback,
    progress: progressCallback,
  })

  downloads.set(signature.path, { promise, jobId })

  const response = await promise
  await RNFS.completeHandlerIOS(jobId)

  downloads.delete(signature.path)

  return {
    response,
    signature,
  }
}

/**
 * Returns local cached image if file exists;
 * Download file and stores into local cache if not
 */
export const handleImage = async ({ signature, progressCallback, beginCallback }) => {
  const hasImage = await checkLocalImage(signature)

  if (hasImage) {
    return signature.path
  }

  await fetchRemoteImage({ signature, progressCallback, beginCallback })
  return signature.path
}

/**
 * async priorityQueue worker, tasks are assigned a priority and completed in ascending priority order
 * 3 concurrent workers will be executed in parallel
 */
export const worker = async (task, callback) => {
  try {
    const response = await handleImage({
      signature: task.signature,
      progressCallback: task.progressCallback,
      beginCallback: task.beginCallback,
    })
    callback(null, 'downloaded', response)
  } catch (error) {
    callback(error, 'fallback', task.source)
  }
}

export const priorityQueueInstance = priorityQueue(worker, 6)

export const initializePriorityQueue = () => priorityQueue(worker, 3)

/**
 * 
 */
export const pushImageQueue = async (
  queueInstance,
  callback,
  progressCallback,
  beginCallback,
  source,
  priority,
) => {
  const signature = generateSignature(source)

  if (await checkLocalImage(signature)) {
    return callback(null, 'cached', signature.path)
  }

  if (downloads.has(signature.path)) {
    const { promise, jobId } = downloads.get(signature.path)
    const response = await promise

    return {
      response,
      signature,
    }
  }

  const queue = queueInstance || priorityQueueInstance

  queue.push({
    signature,
    priority,
    progressCallback,
    beginCallback,
  }, priority, callback)
}

export const removeImageQueue = async (priorities) => {
}
