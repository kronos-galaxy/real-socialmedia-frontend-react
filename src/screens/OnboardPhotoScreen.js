import React from 'react'
import OnboardPhotoComponent from 'components/OnboardPhoto'
import OnboardPhotoServiceComponent from 'components/OnboardPhoto/index.service'

class OnboardPhotoScreen extends React.Component {
  render() {
    return (
      <OnboardPhotoServiceComponent>
        {(props) => (
          <OnboardPhotoComponent
            {...props}
          />
        )}
      </OnboardPhotoServiceComponent>
    )
  }
}

export default OnboardPhotoScreen