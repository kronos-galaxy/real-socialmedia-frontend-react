import React from 'react'
import { SafeAreaView } from 'react-native'
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
                <SafeAreaView style={{ flex: 1, backgroundColor: this.props.navigation.state.params.theme.colors.background, }}>
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
                </SafeAreaView>
              </PaperProvider>
            ))}
          </UserServiceProvider>
        )}
      </ProfileServiceComponent>
    )
  }
}

export default ProfileScreen