import React from 'react'
import ProfileFollowedComponent from 'components/ProfileFollowed'
import ProfileFollowedServiceComponent from 'components/ProfileFollowed/index.service'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import UserServiceProvider from 'services/providers/User'

class ProfileFollowed extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onClosePress={() => this.props.navigation.goBack(null)}
              title={t('Following')}
            />
          )}
        </Translation>

        <ProfileFollowedServiceComponent>
          {(props) => (
            <UserServiceProvider navigation={this.props.navigation}>
              {((userProps) => (
                <ProfileFollowedComponent
                  {...props}
                  {...userProps}
                />
              ))}
            </UserServiceProvider>
          )}
        </ProfileFollowedServiceComponent>
      </>
    )
  }
}

export default ProfileFollowed