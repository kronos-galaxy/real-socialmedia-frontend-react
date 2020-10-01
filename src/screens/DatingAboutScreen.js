import React from 'react'
import DatingAboutComponent from 'components/DatingAbout'
import DatingAboutServiceComponent from 'components/DatingAbout/index.service'

class DatingAboutScreen extends React.Component {
  render() {
    return (
      <DatingAboutServiceComponent>
        {(datingAboutProps) => (
          <DatingAboutComponent
            {...datingAboutProps}
          />
        )}
      </DatingAboutServiceComponent>
    )
  }
}

export default DatingAboutScreen