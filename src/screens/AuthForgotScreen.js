import React from 'react'
import ForgotComponent from 'components/Forgot'
import AuthServiceComponent from 'components/Auth/index.service'

class AuthForgotScreen extends React.Component {
  render() {
    return (
      <AuthServiceComponent>
        {(props) => (
          <ForgotComponent
            {...props}
          />
        )}
      </AuthServiceComponent>
    )
  }
}

export default AuthForgotScreen