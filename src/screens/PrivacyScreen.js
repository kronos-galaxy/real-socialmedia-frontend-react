import React from 'react'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import PrivacyComponent from 'components/Privacy'
import PrivacyServiceComponent from 'components/Privacy/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class PrivacyScreen extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <React.Fragment>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onNavLeftPress={() => this.props.navigation.goBack(null)}
              title={t('Privacy and Mental Health')}
            />
          )}
        </Translation>

        <PrivacyServiceComponent>
          {(props) => (
            <PrivacyComponent
              {...props}
            />
          )}
        </PrivacyServiceComponent>
      </React.Fragment>
    )
  }
}

export default PrivacyScreen