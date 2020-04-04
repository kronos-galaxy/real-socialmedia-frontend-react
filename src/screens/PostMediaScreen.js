import React from 'react'
import PostMediaComponent from 'components/PostMedia'
import PostMediaServiceComponent from 'components/PostMedia/index.service'
import ThemeServiceProvider from 'services/providers/Theme'
import PostServiceComponent from 'components/Post/index.service'
import { Provider as PaperProvider } from 'react-native-paper'
import ContextComponent from 'components/Cache/Context'
import { initializePriorityQueue } from 'components/Cache/Fetch'

const queues = {
  mediaImages: initializePriorityQueue(),
}

const priorityQueueInstance = initializePriorityQueue()

class PostMediaScreen extends React.Component {
  render() {
    return (
      <ThemeServiceProvider themeCode={this.props.route.params.post.postedBy.themeCode}>
        {((themeProps) => (
          <PaperProvider theme={themeProps.activeTheme}>
            <PostServiceComponent>
              {(postProps) => (
                <PostMediaServiceComponent {...postProps}>
                  {(postsProps) => (
                    <ContextComponent.Provider value={queues}>
                      <PostMediaComponent
                        {...postsProps}
                        priorityQueueInstance={priorityQueueInstance}
                      />
                    </ContextComponent.Provider>
                  )}
                </PostMediaServiceComponent>
              )}
            </PostServiceComponent>
          </PaperProvider>
        ))}
      </ThemeServiceProvider>
    )
  }
}

export default PostMediaScreen