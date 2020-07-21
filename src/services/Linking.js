import urlPattern from 'url-pattern'

export class MissingDeeplinkParamsError extends Error {
  constructor(...args) {
    super(...args)
    this.code = 'MISSING_DEEP_LINK_PARAMS_ERROR'
    Error.captureStackTrace(this, MissingDeeplinkParamsError)
  }
}

const options = { segmentValueCharset: ':a-zA-Z0-9_-' }
const matchedPostAction = new urlPattern(
  '*/user/(:userId)/post/(:postId)((/):action)(/)',
  options
)

export const deeplinkPath = (action) => {
  const params = matchedPostAction.match(action)

  if (!params || !params.userId || !params.postId) {
    throw new MissingDeeplinkParamsError('Missing userId or postId parameters')
  }

  return params
}

export const deeplinkNavigation = (navigation, navigationActions, Linking) => (action) => {
  try {
    if (action === 'https://real.app/chat/') {
      return navigationActions.navigateChat(navigation)()
    }

    const params = deeplinkPath(action)

    if (params && params.action === 'comments') {
      return navigationActions.navigateNestedComments(navigation, params)()
    } else if (params && params.action === 'views') {
      return navigationActions.navigateNestedPostViews(navigation, params)()
    } else if (params && params.action === 'likes') {
      return navigationActions.navigateNestedPostLikes(navigation, params)()
    } else if (params && !params.action) {
      return navigationActions.navigateNestedPost(navigation, params)()
    }
  } catch (error) {
    if (error.code === 'MISSING_DEEP_LINK_PARAMS_ERROR') {
      return Linking.openURL(action)
    }
  }
}