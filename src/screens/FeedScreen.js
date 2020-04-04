import React from 'react'
import PostsListComponent from 'components/PostsList'
import PostsListServiceComponent from 'components/PostsList/index.service'
import StoriesServiceComponent from 'components/Stories/index.service'
import ContextComponent from 'components/Cache/Context'
import { initializePriorityQueue } from 'components/Cache/Fetch'

const queues = {
  feedImages: initializePriorityQueue(),
  avatarImages: initializePriorityQueue(),
}

class FeedScreen extends React.Component {
  render() {
    return (
      <PostsListServiceComponent>
        {(postsProps) => (
          <StoriesServiceComponent>
            {((storiesProps) => (
              <ContextComponent.Provider value={queues}>
                <PostsListComponent
                  {...postsProps}
                  {...storiesProps}
                />
              </ContextComponent.Provider>
            ))}
          </StoriesServiceComponent>
        )}
      </PostsListServiceComponent>
    )
  }
}

export default FeedScreen