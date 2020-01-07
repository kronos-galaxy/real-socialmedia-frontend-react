import React from 'react'
import PayoutComponent from 'components/Payout'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class PayoutScreen extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <React.Fragment>
        <Translation>
          {(t) => (
            <NavigationSecondary
              title={t('Payout')}
              onNavLeftPress={() => this.props.navigation.goBack(null)}
            />
          )}
        </Translation>

        <PayoutComponent />
      </React.Fragment>
    )
  }
}

export default PayoutScreen