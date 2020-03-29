import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ChatDirect = ({
  t,
  theme,
  chatCreateDirectRequest,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <GiftedChat
        messages={[
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },{
            _id: 2,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },{
            _id: 3,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ]}
        onSend={message => chatCreateDirectRequest({ text: message[0].text })}
        user={{
          _id: 1,
        }}
      />
    </View>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

ChatDirect.propTypes = {
  theme: PropTypes.any,
}

export default withTranslation()(withTheme(ChatDirect))
