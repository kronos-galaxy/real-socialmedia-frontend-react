import React from 'react'
import { View } from 'react-native'
import PostMediaComponent from 'components/PostMedia'
import PostMediaServiceComponent from 'components/PostMedia/index.service'
import UserServiceProvider from 'services/providers/User'
import PostsListServiceComponent from 'components/PostsList/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Provider as PaperProvider } from 'react-native-paper'

class FeedScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null,
  })
  
  render() {
    return (
      <PaperProvider theme={this.props.navigation.state.params.theme}>
        <View style={ifIphoneX({
          height: 44,
          backgroundColor: this.props.navigation.state.params.theme.colors.background,
        })} />

        <Translation>
          {(t) => (
            <NavigationSecondary
              onNavLeftPress={() => this.props.navigation.goBack(null)}
              title={t('Photo')}
            />
          )}
        </Translation>
        <PostsListServiceComponent>
          {(postsProps) => (
            <PostMediaServiceComponent {...postsProps}>
              {(postsProps) => (
                <UserServiceProvider>
                  {((userProps) => (
                    <PostMediaComponent
                      {...postsProps}
                      {...userProps}
                    />
                  ))}
                </UserServiceProvider>
              )}
            </PostMediaServiceComponent>
          )}
        </PostsListServiceComponent>
      </PaperProvider>
    )
  }
}

export default FeedScreen