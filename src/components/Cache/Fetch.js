import RNFS from 'react-native-fs'
import qs from 'query-string'
import priorityQueue from 'async/priorityQueue'
import promiseRetry from 'promise-retry'

/**
 * 
 */
const getPartial = (source) => {
  if (!source.includes('cloudfront.net')) {
    return source
  }
  return qs.parseUrl(source).url.split('cloudfront.net')[1].replace(':', '-')
}

const getIsRemote = (source) => {
  return source.includes('http://') || source.includes('https://')
}

const generateSignature = (source) => {
  if (typeof source !== 'string' || !source.length) {
    return {
      partial: '',
      path: '',
      isRemote: '',
    }
  }

  const isRemote = getIsRemote(source)
  const partial = getPartial(source)
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
export const fetchRemoteImage = async ({ signature, progressCallback, requestCallback }) => {
  await RNFS.mkdir(signature.pathFolder)

  const { promise, jobId } = RNFS.downloadFile({
    fromUrl: signature.source,
    toFile: signature.path,
    background: true,
    discretionary: true,
    cacheable: false,
    readTimeout: 25000,
    backgroundTimeout: 25000,
    progressDivider: 20,
    resumable: () =>
      RNFS.isResumable(jobId).then(() => RNFS.resumeDownload(jobId)),
    begin: requestCallback,
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
export const handleImage = async ({ signature, progressCallback, requestCallback }) => {
  const hasImage = await checkLocalImage(signature)

  if (hasImage) {
    return signature.path
  }

  await promiseRetry(async (retry, attempts) => {
    try {
      return await fetchRemoteImage({ signature, progressCallback, requestCallback })
    } catch (nextError) {
      retry(nextError)
    }
  }, { retries: 3 })

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
      requestCallback: task.requestCallback,
    })
    callback(null, 'downloaded', response)
  } catch (error) {
    callback(error, 'fallback', task.signature.source)
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
  requestCallback,
  source,
  priority,
) => {
  const signature = generateSignature(source)

  if (!signature.isRemote) {
    return callback(null, 'fallback', signature.path)
  }

  if (await checkLocalImage(signature)) {
    return callback(null, 'cached', signature.path)
  }

  const nextPriority = downloads.has(signature.path) ? 0 : priority
  const queue = queueInstance || priorityQueueInstance

  if (downloads.has(signature.path)) {
    queue.remove(({ data }) => data.signature.path === signature.path)
    const { jobId } = downloads.get(signature.path)
    await RNFS.stopDownload(jobId)
    downloads.delete(signature.path)
  }

  queue.push({
    signature,
    priority: nextPriority,
    progressCallback,
    requestCallback,
  }, nextPriority, callback)
}

export const getImageAvailability = async (source, callback) => {
  const signature = generateSignature(source)
  if (await checkLocalImage(signature)) {
    return callback(null, 'cached', signature.path)
  }
}

export const removeImageQueue = async (priorities) => {
}
