import React from 'react'
import { View } from 'react-native'
import VerificationComponent from 'components/Verification'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import { ifIphoneX } from 'react-native-iphone-x-helper'

class VerificationScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null,
  })
  
  render() {
    return (
      <React.Fragment>
        <View style={ifIphoneX({
          height: 44,
        })} />

        <Translation>
          {(t) => (
            <NavigationSecondary
              title={t('Post Verification')}
              onNavLeftPress={() => this.props.navigation.goBack(null)}
            />
          )}
        </Translation>

        <VerificationComponent />
      </React.Fragment>
    )
  }
}

export default VerificationScreen