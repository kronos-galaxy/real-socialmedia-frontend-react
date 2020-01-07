import React from 'react'
import { SafeAreaView } from 'react-native'
import PostShareServiceComponent from 'components/PostShare/index.service'
import PostShareComponent from 'components/PostShare'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class PostShareScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null,
  })
  
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onNavLeftPress={() => this.props.navigation.goBack(null)}
              title={t('Photo')}
            />
          )}
        </Translation>
        <PostShareServiceComponent>
          {((shareProps) => (
            <PostShareComponent
              {...shareProps}
            />
          ))}
        </PostShareServiceComponent>
      </SafeAreaView>
    )
  }
}

export default PostShareScreen