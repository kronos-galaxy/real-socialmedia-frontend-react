import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import * as navigationActions from 'navigation/actions'
import { isAvatarEmpty } from 'components/Settings/helpers'

import { useNavigation } from '@react-navigation/native'
import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const DatingSettings = ({
  t,
  theme,
  user,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return ( 
    <View style={styling.root}>
      <View style={styling.placeholder}>
        <Text style={styling.text}>{t('Start dating by introducing yourself and setting your dating preferences')}</Text>
      </View>
      <View style={styling.placeholder}>
        {isAvatarEmpty(user) ?
          <DefaultButton label={t('Upload Profile Photo')} onPress={navigationActions.navigateSettings(navigation)} loading={false} mode="outline" /> :
          <DefaultButton label={t('Your Dating Preferences')} onPress={navigationActions.navigateDatingAbout(navigation)} loading={false} mode="outline" />
        }
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  placeholder: {
    paddingVertical: theme.spacing.base,
    paddingHorizontal: theme.spacing.base * 2,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',  
  },
})

DatingSettings.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  user: PropTypes.any,
}

export default withTranslation()(withTheme(DatingSettings))
