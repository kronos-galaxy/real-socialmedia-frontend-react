import React from 'react'
import SignupComponent from 'components/Signup'
import SignupServiceComponent from 'components/Signup/index.service'

class AuthSignupScreen extends React.Component {
  render() {
    return (
      <SignupServiceComponent>
        {(props) => (
          <SignupComponent
            {...props}
          />
        )}
      </SignupServiceComponent>
    )
  }
}

export default AuthSignupScreen