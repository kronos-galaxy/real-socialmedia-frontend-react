import React from 'react'
import ForgotConfirmComponent from 'components/ForgotConfirm'
import ForgotConfirmServiceComponent from 'components/ForgotConfirm/index.service'

class AuthForgotConfirmScreen extends React.Component {
  render() {
    return (
      <ForgotConfirmServiceComponent>
        {(props) => (
          <ForgotConfirmComponent
            {...props}
          />
        )}
      </ForgotConfirmServiceComponent>
    )
  }
}

export default AuthForgotConfirmScreen