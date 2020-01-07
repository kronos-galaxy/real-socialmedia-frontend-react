import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import path from 'ramda/src/path'
import CameraTemplate from 'templates/Camera'
import CameraHeaderTemplate from 'templates/Camera/Header'
import StepsTemplate from 'templates/Steps'
import HeaderComponent from 'components/Story/Header'
import ReactionsPreviewTemplate from 'templates/ReactionsPreview'
import ImageTemplate from 'templates/Image'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Story = ({
  theme,
  postsStoriesGet,
  
  countStories,
  currentStory,
  onNextStory,
  onPrevStory,
  onCloseStory,
  usersGetProfile,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const story = path(['data', currentStory])(postsStoriesGet)

  if (!story) {
    return null
  }
  
  return (
    <View style={styling.root} key={currentStory}>
      <CameraTemplate
        steps={(
          <StepsTemplate steps={countStories} currentStep={currentStory} />
        )}
        header={(
          <CameraHeaderTemplate
            content={(
              <HeaderComponent story={story} usersGetProfile={usersGetProfile} />
            )}
            handleClosePress={onCloseStory}
          />
        )}
        content={(
          <ImageTemplate
            thumbnailSource={{ uri: path(['mediaObjects', '0', 'url64p'])(story) }}
            imageSource={{ uri: path(['mediaObjects', '0', 'url4k'])(story) }}
            resizeMode="contain"
          />
        )}
        footer={(
          <View style={{ padding: 12, flex: 1, flexDirection: 'column-reverse' }}>
            <Text>{story.text}</Text>
          </View>
        )}
        selector={(
          <View style={{ padding: 12 }}>
            <ReactionsPreviewTemplate
              post={story}
            />
          </View>
        )}
        wrapper={(
          <React.Fragment>
            <TouchableOpacity style={styling.wrapperLeft} onPress={onPrevStory} />
            <TouchableOpacity style={styling.wrapperRight} onPress={onNextStory} />
          </React.Fragment>
        )}
      />
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    height: 60,
  },
  photo: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  wrapperLeft: {
    position: 'absolute',
    top: 70,
    left: 0,
    bottom: 0,
    zIndex: 1,
    width: '30%',
  },
  wrapperRight: {
    position: 'absolute',
    top: 70,
    right: 0,
    bottom: 0,
    zIndex: 1,
    width: '70%',
  },
  footer: {
    height: 60,
  },
})

Story.propTypes = {
  theme: PropTypes.any,
  postsStoriesGet: PropTypes.any,
  countStories: PropTypes.any,
  currentStory: PropTypes.any,
  onNextStory: PropTypes.any,
  onPrevStory: PropTypes.any,
  onCloseStory: PropTypes.any,
}

export default withTheme(Story)
