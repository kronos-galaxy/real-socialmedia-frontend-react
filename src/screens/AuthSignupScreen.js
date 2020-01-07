import React from 'react'
import SignupComponent from 'components/Signup'
import AuthServiceComponent from 'components/Auth/index.service'
import AuthNavigationComponent from 'components/NavigationPrimary/Auth'

class AuthSignupScreen extends React.Component {
  static navigationOptions = AuthNavigationComponent
  
  render() {
    return (
      <AuthServiceComponent>
        {(props) => (
          <SignupComponent
            {...props}
          />
        )}
      </AuthServiceComponent>
    )
  }
}

export default AuthSignupScreen