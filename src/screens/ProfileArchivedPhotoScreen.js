import React from 'react'
import ProfileArchivedPhotoComponent from 'components/ProfileArchivedPhoto'
import ProfileArchivedPhotoServiceComponent from 'components/ProfileArchivedPhoto/index.service'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class ProfileArchivedPhotoScreen extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <ProfileArchivedPhotoServiceComponent>
        {(props) => (
          <React.Fragment>

            <Translation>
              {(t) => (
                <NavigationSecondary
                  onNavLeftPress={() => this.props.navigation.goBack(null)}
                  title={t('Archived')}
                />
              )}
            </Translation>
            
            <ProfileArchivedPhotoComponent {...props} />
          </React.Fragment>
        )}
      </ProfileArchivedPhotoServiceComponent>
    )
  }
}

export default ProfileArchivedPhotoScreen