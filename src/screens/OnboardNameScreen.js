import React from 'react'
import FullnameComponent from 'components/OnboardName'
import FullnameServiceComponent from 'components/OnboardName/index.service'

class OnboardNameScreen extends React.Component {
  render() {
    return (
      <FullnameServiceComponent>
        {(props) => (
          <FullnameComponent
            {...props}
          />
        )}
      </FullnameServiceComponent>
    )
  }
}

export default OnboardNameScreen