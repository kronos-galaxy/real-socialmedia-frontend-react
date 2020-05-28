import React from 'react'
import PostErrorComponent from 'components/PostError'
import PostErrorServiceComponent from 'components/PostError/index.service'
import ScreenWrapper from 'templates/Auth/ScreenWrapper'

class PostErrorScreen extends React.Component {
  render() {
    return (
      <PostErrorServiceComponent>
        {(props) => (
          <PostErrorComponent
            {...props}
          />
        )}
      </PostErrorServiceComponent>
    )
  }
}

export default ScreenWrapper(PostErrorScreen)