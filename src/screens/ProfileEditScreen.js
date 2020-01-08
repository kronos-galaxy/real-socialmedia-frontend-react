import React from 'react'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import ProfileEditComponent from 'components/ProfileEdit'
import ProfileEditServiceComponent from 'components/ProfileEdit/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class ProfileScreen extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <React.Fragment>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onNavLeftPress={() => this.props.navigation.goBack(null)}
              title={t('Edit Profile')}
            />
          )}
        </Translation>        

        <ProfileEditServiceComponent>
          {(props) => (
            <ProfileEditComponent
              {...props}
            />
          )}
        </ProfileEditServiceComponent>
      </React.Fragment>
    )
  }
}

export default ProfileScreen