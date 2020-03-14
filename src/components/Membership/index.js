import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Text } from 'react-native-paper'
import TickIcon from 'assets/svg/membership/Tick'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Feature = ({
  t,
  theme,
  children,
  active,
}) => {
  const styling = styles(theme)

  const fill = active ? theme.colors.primary : theme.colors.text

  return (
    <View style={styling.feature}>
      <View style={styling.icon}>
        <TickIcon fill={fill} />
      </View>
      <Text style={{ flexWrap: 'wrap' }}>{children}</Text>
    </View>
  )
}

const FeatureComponent = withTheme(Feature)

const Membership = ({
  t,
  theme,
}) => {
  const styling = styles(theme)
  
  return (
    <ScrollView style={styling.root}>
      <View>
        <View style={styling.title}>
          <Text>Free</Text>
        </View>
        <View style={styling.features}>
          <FeatureComponent>REAL Social Media</FeatureComponent>
          <FeatureComponent>REAL Chat (Coming March 2020)</FeatureComponent>
        </View>
      </View>

      <View>
        <View style={[styling.title, styling.titlePrimary]}>
          <Text>Diamond</Text>
        </View>
        <View style={styling.features}>
          <FeatureComponent active>REAL Social Media</FeatureComponent>
          <FeatureComponent active>REAL Chat (Coming March 2020)</FeatureComponent>
          <FeatureComponent active>Get Paid $0.11 every view (from other Diamond members)</FeatureComponent>
          <FeatureComponent active>Access to Follow “Diamond Exclusive” Private Accounts</FeatureComponent>
          <FeatureComponent active>Diamond emblem next to your username</FeatureComponent>
          <FeatureComponent active>Personalize your profile with exclusive Colors, Themes, and Skins</FeatureComponent>
          <FeatureComponent active>Disable the REAL watermark when sharing posts</FeatureComponent>
          <FeatureComponent active>REAL Dating (Coming April 2020)</FeatureComponent>
        </View>
      </View>

      <View style={styling.action}>
        <DefaultButton label={t('Get Diamond In One Tap')} />
      </View>
    </ScrollView>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  title: {
    backgroundColor: theme.colors.backgroundSecondary,
    padding: theme.spacing.base,
  },
  titlePrimary: {
    backgroundColor: theme.colors.primary,
  },
  icon: {
    marginRight: theme.spacing.base,
  },
  features: {
    marginVertical: 6,
  },
  feature: {
    margin: 6,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  action: {
    padding: theme.spacing.base,
  },
})

Membership.propTypes = {
  theme: PropTypes.any,
}

export default withTranslation()(withTheme(Membership))
