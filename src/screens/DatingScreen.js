import React from 'react'
import DatingComponent from 'components/Dating'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class DatingScreen extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <React.Fragment>
        <Translation>
          {(t) => (
            <NavigationSecondary
              title={t('Dating')}
            />
          )}
        </Translation>

        <DatingComponent />
      </React.Fragment>
    )
  }
}

export default DatingScreen