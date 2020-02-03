import React from 'react'
import AlbumServiceComponent from 'components/Album/index.service'
import AlbumComponent from 'components/Album'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class AlbumScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerShown: false,
  })
  
  render() {
    return (
      <>
        <AlbumServiceComponent>
          {((shareProps) => (
            <AlbumComponent
              {...shareProps}
            />
          ))}
        </AlbumServiceComponent>
      </>
    )
  }
}

export default AlbumScreen