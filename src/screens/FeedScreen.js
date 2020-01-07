import React from 'react'
import PostsListComponent from 'components/PostsList'
import PostsListServiceComponent from 'components/PostsList/index.service'
import StoriesServiceComponent from 'components/Stories/index.service'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import UserServiceProvider from 'services/providers/User'

class FeedScreen extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <PostsListServiceComponent>
        {(postsProps) => (
          <StoriesServiceComponent>
            {((storiesProps) => (
              <UserServiceProvider>
                {((userProps) => (
                  <PostsListComponent
                    {...postsProps}
                    {...storiesProps}
                    {...userProps}
                  />
                ))}
              </UserServiceProvider>
            ))}
          </StoriesServiceComponent>
        )}
      </PostsListServiceComponent>
    )
  }
}

export default FeedScreen