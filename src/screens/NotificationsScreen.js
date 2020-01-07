import React from 'react'
import NotificationsComponent from 'components/Notifications'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class NotificationsScreen extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <React.Fragment>
        <Translation>
          {(t) => (
            <NavigationSecondary
              title={t('Notifications')}
            />
          )}
        </Translation>

        <NotificationsComponent />
      </React.Fragment>
    )
  }
}

export default NotificationsScreen