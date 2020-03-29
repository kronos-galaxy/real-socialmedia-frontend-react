import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import ContactsComponent from 'components/Chat/Contacts'
import HeaderComponent from 'components/Search/Header'
import FormComponent from 'components/Search/Form'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Chat = ({
  t,
  theme,
  feedRef,
  formFocus,
  formChange,
  handleFormFocus,
  handleFormChange,

  chatGetChats,
  usersSearch,
  usersSearchRequest,
  usersGetTrendingUsers,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <HeaderComponent>
        <FormComponent
          usersSearch={usersSearch}
          usersSearchRequest={usersSearchRequest}
          handleFormFocus={handleFormFocus}
          handleFormChange={handleFormChange}
        />
      </HeaderComponent>

      {/* {formFocus && formChange ? */}
        <ScrollView style={styling.root} ref={feedRef}>
          <ContactsComponent
            chatGetChats={chatGetChats}
          />
        </ScrollView>
      {/* : null} */}
    </View>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

Chat.propTypes = {
  theme: PropTypes.any,
}

export default withTranslation()(withTheme(Chat))
