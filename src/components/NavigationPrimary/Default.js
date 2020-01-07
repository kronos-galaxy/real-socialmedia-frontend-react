import React from 'react'
import { TouchableOpacity } from 'react-native'
import LogoIcon from 'assets/svg/header/Logo'
import CameraIcon from 'assets/svg/header/Camera'
import DirectIcon from 'assets/svg/header/Direct'

export default ({ navigation, screenProps }) => ({
  headerStyle: {
    backgroundColor: screenProps.theme.colors.backgroundPrimary,
    borderBottomWidth: 0,
    marginBottom: 12,
  },
  headerLeft: (
    <TouchableOpacity style={{ padding: 12 }} onPress={() => navigation.navigate('Camera')}>
      <CameraIcon
        fill={screenProps.theme.colors.primaryIcon}
      />
    </TouchableOpacity>
  ),
  headerTitle: (
    <LogoIcon
      height="28"
      fill={screenProps.theme.colors.primaryIcon}
    />
  ),
  headerRight: (
    <TouchableOpacity style={{ padding: 12 }} onPress={() => navigation.navigate('Chat')}>
      <DirectIcon
        fill={screenProps.theme.colors.primaryIcon}
      />
    </TouchableOpacity>
  ),
})