import React from 'react'
import FullnameComponent from 'components/Fullname'
import FullnameServiceComponent from 'components/Fullname/index.service'

class AuthOnboardScreen extends React.Component {
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

export default AuthOnboardScreen