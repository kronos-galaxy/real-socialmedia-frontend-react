import React from 'react'
import SignupConfirmComponent from 'components/SignupConfirm'
import SignupConfirmServiceComponent from 'components/SignupConfirm/index.service'

class AuthSignupConfirmScreen extends React.Component {
  render() {
    return (
      <SignupConfirmServiceComponent>
        {(props) => (
          <SignupConfirmComponent
            {...props}
          />
        )}
      </SignupConfirmServiceComponent>
    )
  }
}

export default AuthSignupConfirmScreen