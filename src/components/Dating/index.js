import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Paragraph, Title, Text } from 'react-native-paper'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import * as navigationActions from 'navigation/actions'

import { useNavigation } from '@react-navigation/native'
import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const Dating = ({
  t,
  theme,
  user,
  usersSetUserDatingStatusRequest,
  isDatingAvailable,
  isDatingAvailableDebug,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <View style={styling.content}>
        {user.datingStatus === 'ENABLED' ?
          <Title style={styling.title}>{t('REAL Dating is [Enabled]')}</Title>
        : null}

        {user.datingStatus === 'DISABLED' ?
          <Title style={styling.title}>{t('REAL Dating is [Disabled]')}</Title>
        : null}

        <Paragraph style={styling.paragraph}>{t('Tell us a bit more about your self and your interests to start REAL Dating')}.</Paragraph>

        <View style={styling.action}>
          <DefaultButton label={t('Edit')} onPress={navigationActions.navigateDatingAbout(navigation)} loading={false} />
        </View>

        {isDatingAvailable ?
          <View style={styling.action}>
            <DefaultButton label={t('Start Dating')} onPress={usersSetUserDatingStatusRequest} loading={false} />
          </View>
        : null}

        <Text style={styling.debug}>{isDatingAvailableDebug}</Text>
      </View>
    </View>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: theme.spacing.base,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  paragraph: {
    textAlign: 'center',
  },
  action: {
    marginTop: theme.spacing.base,
  },
  debug: {
    fontSize: 8,
  },
})

Dating.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  user: PropTypes.any,
  usersSetUserDatingStatusRequest: PropTypes.any,
  isDatingAvailable: PropTypes.any,
  isDatingAvailableDebug: PropTypes.any,
}

export default withTranslation()(withTheme(Dating))
