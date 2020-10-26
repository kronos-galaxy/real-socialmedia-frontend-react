import React from 'react'
import DatingComponent from 'components/Dating'
import DatingServiceComponent from 'components/Dating/index.service'
import PermissionsServiceComponent from 'components/Permissions/index.service'

class DatingScreen extends React.Component {
  render() {
    return (
      <PermissionsServiceComponent location>
        {() => (
          <DatingServiceComponent>
            {(datingProps) => (
              <DatingComponent
                {...datingProps}
              />
            )}
          </DatingServiceComponent>
        )}
      </PermissionsServiceComponent>
    )
  }
}

export default DatingScreen