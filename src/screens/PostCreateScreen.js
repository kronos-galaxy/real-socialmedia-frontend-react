import React from 'react'
import { SafeAreaView } from 'react-native'
import PostCreateComponent from 'components/PostCreate'
import PostCreateServiceComponent from 'components/PostCreate/index.service'
import PostsPreviewComponent from 'components/PostsPreview/'
import PostsPreviewServiceComponent from 'components/PostsPreview/index.service'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class PostCreateScreen extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onNavLeftPress={() => this.props.navigation.navigate('Camera')}
              title={t('New Photo')}
            />
          )}
        </Translation>

        <PostsPreviewServiceComponent>
          {((previewProps) => (
            <PostCreateServiceComponent>
              {(props) => (
                <React.Fragment>
                  <PostsPreviewComponent
                    {...previewProps}
                  />
                  <PostCreateComponent
                    {...props}
                    {...previewProps}
                  />
                </React.Fragment>
              )}
            </PostCreateServiceComponent>
          ))}
        </PostsPreviewServiceComponent>
      </SafeAreaView>
    )
  }
}

export default PostCreateScreen