import React from 'react'
import { SafeAreaView } from 'react-native'
import PostMediaViewsComponent from 'components/PostMediaViews'
import PostMediaViewsServiceComponent from 'components/PostMediaViews/index.service'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import UserServiceProvider from 'services/providers/User'

class PostMediaViews extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onClosePress={() => this.props.navigation.goBack(null)}
              title={t('Views')}
            />
          )}
        </Translation>        

        <PostMediaViewsServiceComponent>
          {(props) => (
            <UserServiceProvider navigation={this.props.navigation}>
              {((userProps) => (
                <PostMediaViewsComponent
                  {...props}
                  {...userProps}
                />
              ))}
            </UserServiceProvider>
          )}
        </PostMediaViewsServiceComponent>
      </SafeAreaView>
    )
  }
}

export default PostMediaViews