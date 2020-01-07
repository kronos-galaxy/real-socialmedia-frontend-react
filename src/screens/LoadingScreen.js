import React from 'react'
import LoadingComponent from 'components/Loading'

class LoadingScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null,
  })

  render() {
    return (
      <>
        <LoadingComponent />
      </>
    )
  }
}

export default LoadingScreen