import React from 'react'
import ChatComponent from 'components/Chat'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class ChatScreen extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <React.Fragment>
        <Translation>
          {(t) => (
            <NavigationSecondary
              title={t('Chat')}
            />
          )}
        </Translation>

        <ChatComponent />
      </React.Fragment>
    )
  }
}

export default ChatScreen