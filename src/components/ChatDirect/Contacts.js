import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import path from 'ramda/src/path'
import { Text, Caption } from 'react-native-paper'
import RowsComponent from 'templates/Rows'
import RowsItemComponent from 'templates/RowsItem'
import UserRowComponent from 'templates/UserRow'
import Avatar from 'templates/Avatar'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Contacts = ({
  t,
  theme,
  contacts,
  loading = false,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <ScrollView
      style={styling.root}
      refreshControl={
        <RefreshControl
          tintColor={theme.colors.border}
          refreshing={loading}
        />
      }
    >
      <RowsComponent items={path(['data'])(contacts)}>
        {(user) => (
          <RowsItemComponent>
            <UserRowComponent
              avatar={
                <TouchableOpacity onPress={navigationActions.navigateProfile(navigation, { user })}>
                  <Avatar
                    active
                    thumbnailSource={{ uri: path(['photo', 'url64p'])(user) }}
                    imageSource={{ uri: path(['photo', 'url64p'])(user) }}
                    themeCode={path(['themeCode'])(user)}
                  />
                </TouchableOpacity>
              }
              content={
                <TouchableOpacity onPress={navigationActions.navigateProfile(navigation, { user })} style={styling.user}>
                  <Text style={styling.username}>{path(['username'])(user)}</Text>
                  <Caption style={styling.fullname}>Hey There, how aree you doing over ?</Caption>
                </TouchableOpacity>
              }
              action={null}
            />
          </RowsItemComponent>
        )}
      </RowsComponent>
    </ScrollView>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    padding: theme.spacing.base,
  },
  user: {
    paddingHorizontal: 8,
  },
  username: {
  },
  fullname: {
  },
})

Contacts.propTypes = {
  theme: PropTypes.any,
}

export default withTranslation()(withTheme(Contacts))
