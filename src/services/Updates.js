import { Linking, Alert } from 'react-native'
import { getReadableVersion } from 'react-native-device-info'
import axios from 'axios'
import * as Logger from 'services/Logger'

export const versionCheck = (async () => {
  try {
    const data = await axios.get('https://d3dclx0mrf3ube.cloudfront.net/versions/production.json')
    const isNeeded = !getReadableVersion().includes(data.data.version)

    if (false) {
      Alert.alert(
        'App Update Available',
        'Please update REAL to continue proceeding',
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