import React from 'react'
import VerificationComponent from 'components/Verification'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class VerificationScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerShown: false,
  })
  
  render() {
    return (
      <>
        <Translation>
          {(t) => (
            <NavigationSecondary
              title={t('Post Verification')}
              onClosePress={() => this.props.navigation.goBack(null)}
            />
          )}
        </Translation>

        <VerificationComponent />
      </>
    )
  }
}

export default VerificationScreen