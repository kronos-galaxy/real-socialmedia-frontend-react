import React from 'react'
import { TouchableOpacity } from 'react-native'
import LogoIcon from 'assets/svg/header/Logo'
import CameraIcon from 'assets/svg/header/Camera'
import DirectIcon from 'assets/svg/header/Direct'

const headerLeft = ({ screenProps, navigation }) => () => (
  <TouchableOpacity style={{ padding: 12 }} onPress={() => navigation.navigate('Camera')}>
    <CameraIcon
      fill={screenProps.theme.colors.primaryIcon}
    />
  </TouchableOpacity>
)

const headerTitle = ({ screenProps }) => () => (
  <LogoIcon
    height="28"
    fill={screenProps.theme.colors.primaryIcon}
  />
)

const headerRight = ({ screenProps, navigation }) => () => (
  <TouchableOpacity style={{ padding: 12 }} onPress={() => navigation.navigate('Chat')}>
    <DirectIcon
      fill={screenProps.theme.colors.primaryIcon}
    />
  </TouchableOpacity>
)

export default ({ navigation, screenProps }) => ({
  headerStyle: {
    backgroundColor: screenProps.theme.colors.backgroundPrimary,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
  headerLeft: headerLeft({ screenProps, navigation }),
  headerTitle: headerTitle({ screenProps, navigation }),
  headerRight: headerRight({ screenProps, navigation }),
})