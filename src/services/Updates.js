import { Linking, Alert } from 'react-native'
import { getReadableVersion } from 'react-native-device-info'
import * as Logger from 'services/Logger'

export const versionCheck = (async () => {
  try {
    const data = await (async () => {
      const data = await fetch('https://d3dclx0mrf3ube.cloudfront.net/versions/production.json')
      return await data.json()
    })()

    const isNeeded = !getReadableVersion().includes(data.data.version)

    if (false) {
      Alert.alert(
        'App Update Available',
        'Please update REAL to continue',
        [{
          text: 'Done',
          onPress: () => Linking.openURL('https://apps.apple.com/us/app/real-social-media/id1485194570?ls=1').catch(console.log),
          style: 'cancel',
        }],
        { cancelable: false },
      )
    }
  } catch (error) {
    Logger.captureException(error)
  }
})