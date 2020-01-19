import React from 'react'
import PostShareServiceComponent from 'components/PostShare/index.service'
import PostShareComponent from 'components/PostShare'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class PostShareScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerShown: false,
  })
  
  render() {
    return (
      <>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onClosePress={() => this.props.navigation.goBack(null)}
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
      </>
    )
  }
}

export default PostShareScreen