import React from 'react'
import OnboardingComponent from 'components/Onboarding'
import OnboardingServiceComponent from 'components/Onboarding/index.service'

class OnboardingScreen extends React.Component {
  render() {
    return (
      <OnboardingServiceComponent>
        {((shareProps) => (
          <OnboardingComponent
            {...shareProps}
          />
        ))}
      </OnboardingServiceComponent>
    )
  }
}

export default OnboardingScreen