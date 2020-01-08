import React from 'react'
import MembershipComponent from 'components/Membership'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class MembershipScreen extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <React.Fragment>
        <Translation>
          {(t) => (
            <NavigationSecondary
              title={t('Post Membership')}
              onNavLeftPress={() => this.props.navigation.goBack(null)}
            />
          )}
        </Translation>

        <MembershipComponent />
      </React.Fragment>
    )
  }
}

export default MembershipScreen