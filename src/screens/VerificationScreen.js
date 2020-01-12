import React from 'react'
import { SafeAreaView } from 'react-native'
import VerificationComponent from 'components/Verification'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class VerificationScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null,
  })
  
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Translation>
          {(t) => (
            <NavigationSecondary
              title={t('Post Verification')}
              onNavLeftPress={() => this.props.navigation.goBack(null)}
            />
          )}
        </Translation>

        <VerificationComponent />
      </SafeAreaView>
    )
  }
}

export default VerificationScreen