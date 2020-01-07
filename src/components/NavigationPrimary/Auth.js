import React from 'react'
import PropTypes from 'prop-types'
import LogoIcon from 'assets/svg/header/Logo'

export default ({ navigation, screenProps }) => ({
  headerStyle: {
    backgroundColor: screenProps.theme.colors.backgroundPrimary,
    borderBottomWidth: 0,
    height: 70,
  },
  headerLeftContainerStyle: {
    padding: screenProps.theme.spacing.base,
  },
  headerLeft: null,
  headerTitle: (
    <LogoIcon
      height="28"
      fill={screenProps.theme.colors.primaryIcon}
    />
  ),
  headerRightContainerStyle: {
    padding: screenProps.theme.spacing.base,
  },
  headerRight: null,
})