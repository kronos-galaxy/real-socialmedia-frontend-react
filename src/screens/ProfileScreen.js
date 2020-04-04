import React from 'react'
import AlbumsGridServiceComponent from 'components/AlbumsGrid/index.service'
import PostsGridServiceComponent from 'components/PostsGrid/index.service'
import ProfileServiceComponent from 'components/Profile/index.service'
import ProfileComponent from 'components/Profile'
import ThemeServiceProvider from 'services/providers/Theme'
import { Provider as PaperProvider } from 'react-native-paper'
import ContextComponent from 'components/Cache/Context'
import { initializePriorityQueue } from 'components/Cache/Fetch'

const queues = {
  feedImages: initializePriorityQueue(),
  albumImages: initializePriorityQueue(),
}

class ProfileScreen extends React.Component {
  render() {
    return (
      <ThemeServiceProvider themeCode={this.props.route.params.user.themeCode}>
        {((themeProps) => (
          <ProfileServiceComponent>
            {(profileProps) => (
              <PaperProvider theme={themeProps.activeTheme}>
                <PostsGridServiceComponent>
                  {(postsProps) => (
                    <AlbumsGridServiceComponent>
                      {(albumsProps) => (
                        <ContextComponent.Provider value={queues}>
                          <ProfileComponent
                            {...profileProps}
                            {...postsProps}
                            {...albumsProps}
                          />
                        </ContextComponent.Provider>
                      )}
                    </AlbumsGridServiceComponent>
                  )}
                </PostsGridServiceComponent>
              </PaperProvider>
            )}
          </ProfileServiceComponent>
        ))}
      </ThemeServiceProvider>
    )
  }
}

export default ProfileScreen