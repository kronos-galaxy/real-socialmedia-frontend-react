import React from 'react'
import SearchComponent from 'components/Search'
import SearchServiceComponent from 'components/Search/index.service'
import ContextComponent from 'components/Cache/Context'
import { initializePriorityQueue } from 'components/Cache/Fetch'

const queues = {
  searchImages: initializePriorityQueue(),
}

class SearchScreen extends React.Component {
  render() {
    return (
      <SearchServiceComponent>
        {(searchProps) => (
          <ContextComponent.Provider value={queues}>
            <SearchComponent
              {...searchProps}
            />
          </ContextComponent.Provider>
        )}
      </SearchServiceComponent>
    )
  }
}

export default SearchScreen