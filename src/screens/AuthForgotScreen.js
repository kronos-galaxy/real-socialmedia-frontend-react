import React from 'react'
import ForgotComponent from 'components/Forgot'
import ForgotServiceComponent from 'components/Forgot/index.service'

class AuthForgotScreen extends React.Component {
  render() {
    return (
      <ForgotServiceComponent>
        {(props) => (
          <ForgotComponent
            {...props}
          />
        )}
      </ForgotServiceComponent>
    )
  }
}

export default AuthForgotScreen