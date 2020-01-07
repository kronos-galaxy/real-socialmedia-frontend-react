import React from 'react'
import PostsGridServiceComponent from 'components/PostsGrid/index.service'
import ProfileSelfServiceComponent from 'components/ProfileSelf/index.service'
import ProfileComponent from 'components/Profile'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import path from 'ramda/src/path'
import UserServiceProvider from 'services/providers/User'

class ProfileSelfScreen extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <PostsGridServiceComponent>
        {(postsProps) => (
          <ProfileSelfServiceComponent>
            {(profileProps) => (
              <UserServiceProvider>
                {((userProps) => (
                  <React.Fragment>
                    <NavigationSecondary
                      title={(
                        path(['data', 'username'])(profileProps.usersGetProfile) ||
                        path(['username'])(profileProps.authUser)
                      )}
                      onNavRightPress={() => {}}
                      rightLabel="$0.00"
                    />
                    <ProfileComponent
                      {...profileProps}
                      {...postsProps}
                      {...userProps}
                    />
                  </React.Fragment>
                ))}
              </UserServiceProvider>
            )}
          </ProfileSelfServiceComponent>
        )}
      </PostsGridServiceComponent>
    )
  }
}

export default ProfileSelfScreen