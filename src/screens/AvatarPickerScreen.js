import React from 'react'
import { View } from 'react-native'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import AvatarPickerComponent from 'components/AvatarPicker'
import AvatarPickerServiceComponent from 'components/AvatarPicker/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import { ifIphoneX } from 'react-native-iphone-x-helper'

class AvatarPickerScreen extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <AvatarPickerServiceComponent>
        {(props) => (
          <React.Fragment>
            <View style={ifIphoneX({
              height: 44,
            })} />

            <Translation>
              {(t) => (
                <NavigationSecondary
                  title={t('Upload Profile Photo')}
                />
              )}
            </Translation>            

            <AvatarPickerComponent
              {...props}
            />
          </React.Fragment>
        )}
      </AvatarPickerServiceComponent>
    )
  }
}

export default AvatarPickerScreen