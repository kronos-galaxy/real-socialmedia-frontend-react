import React from 'react'
import DatingMatchComponent from 'components/DatingMatch'
import DatingMatchServiceComponent from 'components/DatingMatch/index.service'
import PermissionsServiceComponent from 'components/Permissions/index.service'

class DatingMatchScreen extends React.Component {
  render() {
    return (
      <PermissionsServiceComponent location>
        {() => (
          <DatingMatchServiceComponent>
            {(datingMatchProps) => (
              <DatingMatchComponent
                {...datingMatchProps}
              />
            )}
          </DatingMatchServiceComponent>
        )}
      </PermissionsServiceComponent>
    )
  }
}

export default DatingMatchScreen