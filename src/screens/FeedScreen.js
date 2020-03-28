import React from 'react'
import PostsListComponent from 'components/PostsList'
import PostsListServiceComponent from 'components/PostsList/index.service'
import StoriesServiceComponent from 'components/Stories/index.service'
import { initializePriorityQueue } from 'components/Cache/Fetch'

const priorityQueueInstance = initializePriorityQueue()

class FeedScreen extends React.Component {
  render() {
    return (
      <PostsListServiceComponent>
        {(postsProps) => (
          <StoriesServiceComponent>
            {((storiesProps) => (
              <PostsListComponent
                {...postsProps}
                {...storiesProps}
                priorityQueueInstance={priorityQueueInstance}
              />
            ))}
          </StoriesServiceComponent>
        )}
      </PostsListServiceComponent>
    )
  }
}

export default FeedScreen