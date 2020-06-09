import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import Card from 'components/FeedCards/Card'
import Layout from 'constants/Layout'
import Carousel from 'react-native-snap-carousel'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const FeedCards = ({
  t,
  theme,
  usersGetCards,
  handleCardPress,
}) => {
  const styling = styles(theme)
  const cardsRef = useRef(null)

  if (!usersGetCards.data.length) {
    return null
  }

  return (
    <View style={styling.root}>
      <Carousel
        ref={cardsRef}
        enableMomentum
        data={usersGetCards.data}
        renderItem={Card({
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.backgroundSecondary,
          handleCardPress,
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
      />
    </View>
  )
}

FeedCards.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  usersGetCards: PropTypes.any,
  handleCardPress: PropTypes.any,
}

const styles = theme => StyleSheet.create({
  root: {
    height: 80,
    backgroundColor: theme.colors.secondary,
  },
})

export default withTranslation()(withTheme(FeedCards))
