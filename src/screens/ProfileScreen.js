import React from 'react'
import PostsGridServiceComponent from 'components/PostsGrid/index.service'
import ProfileServiceComponent from 'components/Profile/index.service'
import ProfileComponent from 'components/Profile'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import path from 'ramda/src/path'
import { Provider as PaperProvider } from 'react-native-paper'
import UserServiceProvider from 'services/providers/User'

class ProfileScreen extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <ProfileServiceComponent>
        {(profileProps) => (
          <UserServiceProvider>
            {((userProps) => (
              <PaperProvider theme={this.props.navigation.state.params.theme}>
                <>
                  <NavigationSecondary
                    onClosePress={() => this.props.navigation.goBack(null)}
                    title={(
                      path(['data', 'username'])(profileProps.usersGetProfile) ||
                      path(['username'])(profileProps.authUser)
                    )}
                  />
                  <PostsGridServiceComponent>
                    {(postsProps) => (
                      <ProfileComponent
                        {...profileProps}
                        {...postsProps}
                        {...userProps}
                      />
                    )}
                  </PostsGridServiceComponent>
                </>
              </PaperProvider>
            ))}
          </UserServiceProvider>
        )}
      </ProfileServiceComponent>
    )
  }
}

export default ProfileScreen