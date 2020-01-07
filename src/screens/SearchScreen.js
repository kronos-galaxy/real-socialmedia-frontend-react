import React from 'react'
import SearchComponent from 'components/Search'
import SearchServiceComponent from 'components/Search/index.service'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import UserServiceProvider from 'services/providers/User'

class SearchScreen extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <SearchServiceComponent>
        {(searchProps) => (
          <UserServiceProvider>
            {((userProps) => (
              <SearchComponent
                {...searchProps}
                {...userProps}
              />
            ))}
          </UserServiceProvider>
        )}
      </SearchServiceComponent>
    )
  }
}

export default SearchScreen