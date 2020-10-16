import React from 'react'
import PropTypes from 'prop-types'
import color from 'color'
import { Alert, View, SafeAreaView, StyleSheet, RefreshControl, FlatList } from 'react-native'
import { Text } from 'react-native-paper'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'react-native-paper'
import ContactsIcon from 'assets/svg/contacts/Contacts'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import Avatar from 'templates/Avatar'
import RowsItemComponent from 'templates/RowsItem'
import UserRowComponent from 'templates/UserRow'
import testIDs from 'components/InviteFriends/test-ids'

const InviteFriends = ({ t, theme, contactsGet, contactsGetRequest, openSettings, contactsInviteRequest, invited }) => {
  const styling = styles(theme)
  const isLoading = contactsGet.status === 'loading'
  const isSuccess = contactsGet.status === 'success'
  const isEmpty = contactsGet.items.length === 0

  const handleInvitePress = (user) => {
    const emails = user.emailAddresses.map((value) => ({ value, type: 'email' }))
    const phones = user.phoneNumbers.map((value) => ({ value, type: 'phone' }))
    const options = [...emails, ...phones].map((contact) => ({
      text: contact.value,
      onPress: () => contactsInviteRequest({ user, contact }),
    }))

    if (options.length === 1) {
      options[0].onPress()
    } else {
      Alert.alert(
        t('Invite {{fullName}}', { fullName: user.fullName }),
        t('Сhoose a contact'),
        [...options, { text: t('Cancel'), style: 'cancel' }],
        { cancelable: true },
      )
    }
  }

  const refreshControl = (
    <RefreshControl tintColor={theme.colors.border} onRefresh={contactsGetRequest} refreshing={isLoading} />
  )

  const renderRow = ({ item }) => {
    const avatarSource = { uri: item.thumbnailPath }
    const action = invited.items.includes(item.recordID) ? (
      <DefaultButton label={t('Invited')} mode="outlined" size="compact" disabled />
    ) : (
      <DefaultButton label={t('Invite')} onPress={() => handleInvitePress(item)} mode="outlined" size="compact" />
    )

    return (
      <RowsItemComponent testID={testIDs.row} hasBorders>
        <UserRowComponent
          avatar={<Avatar thumbnailSource={avatarSource} imageSource={avatarSource} active={false} />}
          content={
            <Text numberOfLines={1} ellipsizeMode="tail" style={styling.fullName}>
              {item.fullName}
            </Text>
          }
          action={action}
        />
      </RowsItemComponent>
    )
  }

  const renderEmpty = () => {
    return isSuccess ? (
      <Text style={styling.emptyText}>{t('We couldn\'t find any contacts on your device. Pull down to refresh.')}</Text>
    ) : null
  }

  function getTitles(invitedCount) {
    if (invitedCount >= 10) {
      return {
        title: t('Connect Your Contacts'),
        subtitle: t('Find people you know on REAL and choose who to follow or invite'),
      }
    } else {
      return {
        title: t('Earn Free REAL Diamond'),
        subtitle: t('Follow or Invite {{invitedCount}}/10 friends & get REAL Diamond FREE for 2 months!', {
          invitedCount,
        }),
      }
    }
  }

  const renderHeader = () => {
    const { title, subtitle } = getTitles(invited.items.length)

    return (
      <View style={styling.heading}>
        <View style={styling.headerIcon}>
          <ContactsIcon fill={theme.colors.text} />
        </View>
        <Text style={styling.headingTitle}>{title}</Text>
        <Text style={styling.headingSubtitle}>{subtitle}</Text>
        <View style={styling.actions}>
          {contactsGet.error ? <Text style={styling.errorText}>{contactsGet.error}</Text> : null}
          {contactsGet.status === 'failure' && (
            <DefaultButton style={styling.openSettingsBtn} label={t('Open Settings')} onPress={openSettings} />
          )}
          {!['failure', 'success'].includes(contactsGet.status) && isEmpty && (
            <DefaultButton
              label={t('Check Contacts')}
              onPress={contactsGetRequest}
              loading={isLoading}
              disabled={isLoading}
            />
          )}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styling.root}>
      <FlatList
        contentContainerStyle={styling.list}
        ListHeaderComponent={renderHeader()}
        ListEmptyComponent={renderEmpty()}
        keyExtractor={(item) => item.recordID}
        refreshControl={refreshControl}
        data={contactsGet.items}
        renderItem={renderRow}
      />
    </SafeAreaView>
  )
}

InviteFriends.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  contactsGetRequest: PropTypes.func,
  openSettings: PropTypes.func,
  contactsInviteRequest: PropTypes.func,
  contactsGet: PropTypes.shape({
    status: PropTypes.string,
    error: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        givenName: PropTypes.string,
        middleName: PropTypes.string,
        familyName: PropTypes.string,
      }),
    ),
  }),
  invited: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.string),
  }),
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    list: {
      paddingHorizontal: 12,
    },
    headerIcon: {
      alignItems: 'center',
      paddingBottom: 12,
    },
    heading: {
      paddingHorizontal: 48,
      paddingVertical: 24,
    },
    headingTitle: {
      fontSize: 22,
      fontWeight: '600',
      paddingBottom: 6,
      textAlign: 'center',
    },
    headingSubtitle: {
      fontSize: 16,
      fontWeight: '400',
      color: color(theme.colors.text).fade(0.4).string(),
      textAlign: 'center',
    },
    errorText: {
      fontSize: 14,
      fontWeight: '300',
      paddingBottom: 6,
      textAlign: 'center',
      color: 'red',
    },
    emptyText: {
      fontSize: 14,
      fontWeight: '300',
      textAlign: 'center',
    },
    actions: {
      paddingTop: 16,
    },
    openSettingsBtn: {
      marginTop: 12,
    },
    fullName: {
      paddingHorizontal: 8,
    },
  })

export default withTranslation()(withTheme(InviteFriends))
