import React from 'react'
import StoryServiceComponent from 'components/Story/index.service'
import StoryComponent from 'components/Story'
import { initializePriorityQueue } from 'components/Cache/Fetch'

const priorityQueueInstance = initializePriorityQueue()

class StoryScreen extends React.Component {
  render() {
    return (
      <StoryServiceComponent>
        {((storyProps) => (
          <StoryComponent
            {...storyProps}
            priorityQueueInstance={priorityQueueInstance}
          />
        ))}
      </StoryServiceComponent>
    )
  }
}

export default StoryScreen