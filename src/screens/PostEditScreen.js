import React from 'react'
import PostEditComponent from 'components/PostEdit'
import PostEditServiceComponent from 'components/PostEdit/index.service'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class PostEditScreen extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onClosePress={() => this.props.navigation.goBack(null)}
              title={t('Edit Post')}
            />
          )}
        </Translation>

        <PostEditServiceComponent>
          {(props) => (
            <PostEditComponent
              {...props}
            />
          )}
        </PostEditServiceComponent>
      </>
    )
  }
}

export default PostEditScreen