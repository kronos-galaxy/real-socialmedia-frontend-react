import React from 'react'
import ModalComponent from 'components/Modal'

class ModalScreen extends React.Component {
  static navigationOptions = null
  
  render() {
    return (
      <ModalComponent
        {...this.props}
      />
    )
  }
}

export default ModalScreen