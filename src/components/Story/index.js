import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import path from 'ramda/src/path'
import Carousel from 'react-native-snap-carousel'
import Layout from 'constants/Layout'
import StepsTemplate from 'templates/Steps'
import HeaderComponent from 'components/Story/Header'
import CameraTemplate from 'templates/Camera'
import CameraHeaderTemplate from 'templates/Camera/Header'
import ImageTemplate from 'templates/Image'
import { BlurView } from '@react-native-community/blur'
import LinearGradient from 'react-native-linear-gradient'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const StoryCarousel = ({
  ref,
  theme,
  countStories,
  currentStory,
  onNextStory,
  onPrevStory,
  onCloseStory,
}) => ({
  item: user,
  index,
}) => {
  const styling = styles(theme)

  const story = user.stories.items[currentStory || 0]

  if (!story) {
    return (
      <View style={styling.sliderItem}>
        <View style={styling.backdrop} />
        <BlurView style={styling.blur} />
        <LinearGradient
          colors={[theme.colors.backgroundPrimary, `transparent`]}
          style={styling.gradient}
        />
      </View>
    )
  }

  return (
    <View style={styling.sliderItem}>
      <View style={styling.backdrop} />
      <BlurView style={styling.blur} />
      <LinearGradient
        colors={[theme.colors.backgroundPrimary, `transparent`]}
        style={styling.gradient}
      />

      <CameraTemplate
        steps={(
          <StepsTemplate steps={user.stories.items.length} currentStep={currentStory} />
        )}
        header={(
          <CameraHeaderTemplate
            content={(
              <HeaderComponent story={story} usersGetProfile={{ data: user }} />
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
        footer={null}
        selector={null}
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

const Story = ({
  theme,
  userId,
  usersGetFollowedUsersWithStories,
  storyRef,
  countStories,
  currentStory,
  onNextStory,
  onPrevStory,
  onCloseStory,
  onSnapItem,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  
  return (
    <View style={styling.root} key={currentStory}>
      <Carousel
        firstItem={usersGetFollowedUsersWithStories.data.findIndex(user => user.userId === userId)}
        enableMomentum
        ref={storyRef}
        data={usersGetFollowedUsersWithStories.data}
        renderItem={StoryCarousel({
          storyRef,
          theme,
          countStories,
          currentStory,
          onNextStory,
          onPrevStory,
          onCloseStory,
        })}
        sliderWidth={Layout.window.width}
        itemWidth={Layout.window.width}
        removeClippedSubviews={false}
        slideStyle={{
          margin: 0,
          padding: 0,
        }}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        layout="stack"
        onBeforeSnapToItem={onSnapItem}
      />
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
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
  sliderItem: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.backgroundPrimary,
    opacity: 0.6,
  },
  blur: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  steps: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
    height: 50,
    paddingTop: 20,
  },
  header: {
    ...StyleSheet.absoluteFill,
    top: 50,
    zIndex: 1,
    height: 30,
    paddingHorizontal: 10,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    height: 130,
  },
})

Story.propTypes = {
  theme: PropTypes.any,
  countStories: PropTypes.any,
  currentStory: PropTypes.any,
  onNextStory: PropTypes.any,
  onPrevStory: PropTypes.any,
  onCloseStory: PropTypes.any,
}

export default withNavigation(
  withTheme(Story)
)
