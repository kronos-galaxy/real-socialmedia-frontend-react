import React from 'react'
import SearchComponent from 'components/Search'
import SearchServiceComponent from 'components/Search/index.service'
import { initializePriorityQueue } from 'components/Cache/Fetch'

const priorityQueueInstance = initializePriorityQueue()

class SearchScreen extends React.Component {
  render() {
    return (
      <SearchServiceComponent>
        {(searchProps) => (
          <SearchComponent
            {...searchProps}
            priorityQueueInstance={priorityQueueInstance}
          />
        )}
      </SearchServiceComponent>
    )
  }
}

export default SearchScreen