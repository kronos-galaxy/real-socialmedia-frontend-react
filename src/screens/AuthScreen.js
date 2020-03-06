import React from 'react'
import AuthComponent from 'components/Auth'
import AuthServiceComponent from 'components/Auth/index.service'

class AuthScreen extends React.Component {
  render() {
    return (
      <AuthServiceComponent>
        {(props) => (
          <AuthComponent
            {...props}
          />
        )}
      </AuthServiceComponent>
    )
  }
}

export default AuthScreen