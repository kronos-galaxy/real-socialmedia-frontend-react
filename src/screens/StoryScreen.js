import React from 'react'
import StoryServiceComponent from 'components/Story/index.service'
import StoryComponent from 'components/Story'
import ContextComponent from 'components/Cache/Context'
import { initializePriorityQueue } from 'store/ducks/cache/service'

const priorityQueueInstance = initializePriorityQueue()

const queues = {
  storyImages: initializePriorityQueue(),
}

class StoryScreen extends React.Component {
  render() {
    return (
      <StoryServiceComponent>
        {((storyProps) => (
          <ContextComponent.Provider value={queues}>
            <StoryComponent
              {...storyProps}
              priorityQueueInstance={priorityQueueInstance}
            />
          </ContextComponent.Provider>
        ))}
      </StoryServiceComponent>
    )
  }
}

export default StoryScreen