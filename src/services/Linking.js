import { Linking } from 'react-native'
import * as navigationActions from 'navigation/actions'
import urlPattern from 'url-pattern'

const options = { segmentValueCharset: '/:a-zA-Z0-9_-' }
const matchComment = new urlPattern(
  '*/user/:userId/post/:postId/comments',
  options
)

export const deeplinkNavigation = (navigation) => (action) => {
  const matchedComment = matchComment.match(action)

  if (action === 'https://real.app/chat/') {
    navigationActions.navigateChat(navigation)()
  } else if (matchedComment) {
    navigationActions.navigateComments(navigation, matchedComment)()
  } else {
    Linking.openURL(action)
  }
}