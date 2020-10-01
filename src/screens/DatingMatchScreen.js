import React from 'react'
import DatingMatchComponent from 'components/DatingMatch'
import DatingMatchServiceComponent from 'components/DatingMatch/index.service'

class DatingMatchScreen extends React.Component {
  render() {
    return (
      <DatingMatchServiceComponent>
        {(datingMatchProps) => (
          <DatingMatchComponent
            {...datingMatchProps}
          />
        )}
      </DatingMatchServiceComponent>
    )
  }
}

export default DatingMatchScreen