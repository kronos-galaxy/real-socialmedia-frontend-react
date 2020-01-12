import React from 'react'
import { SafeAreaView } from 'react-native'
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
      <SafeAreaView style={{ flex: 1 }}>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onNavLeftPress={() => this.props.navigation.goBack(null)}
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
      </SafeAreaView>
    )
  }
}

export default ProfileFollowed