import { Linking } from 'react-native'
import * as navigationActions from 'navigation/actions'
import urlPattern from 'url-pattern'

const options = { segmentValueCharset: '/:a-zA-Z0-9_-' }
const matchComments = new urlPattern(
  '*/user/:userId/post/:postId/comments',
  options
)

const matchViews = new urlPattern(
  '*/user/:userId/post/:postId/views',
  options
)

const matchLikes = new urlPattern(
  '*/user/:userId/post/:postId/likes',
  options
)

export const deeplinkNavigation = (navigation) => (action) => {
  const matchedComments = matchComments.match(action)
  const matchedViews = matchViews.match(action)
  const matchedLikes = matchLikes.match(action)

  if (action === 'https://real.app/chat/') {
    navigationActions.navigateChat(navigation)()
  } else if (matchedComments) {
    navigationActions.navigateComments(navigation, matchedComments)()
  } else if (matchedViews) {
    navigationActions.navigatePostViews(navigation, matchedViews)()
  } else if (matchedLikes) {
    navigationActions.navigatePostViews(navigation, matchedLikes)()
  } else {
    Linking.openURL(action)
  }
}