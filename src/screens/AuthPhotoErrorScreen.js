import React from 'react'
import AuthPhotoErrorComponent from 'components/AuthPhotoError'
import AuthPhotoErrorServiceComponent from 'components/AuthPhotoError/index.service'
import ScreenWrapper from 'templates/Auth/ScreenWrapper'

class AuthPhotoErrorScreen extends React.Component {
  render() {
    return (
      <AuthPhotoErrorServiceComponent>
        {(props) => (
          <AuthPhotoErrorComponent
            {...props}
          />
        )}
      </AuthPhotoErrorServiceComponent>
    )
  }
}

export default ScreenWrapper(AuthPhotoErrorScreen)