import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import CloseIcon from 'assets/svg/post/Close'
import { Text } from 'react-native-paper'
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'

const FeedCard = ({
  borderColor,
  backgroundColor,
  handleCardPress,
  usersDeleteCardRequest,
}) => ({ item: card }) => {
  const customStyle = {
    borderColor,
    backgroundColor,
  }

  return (
    <View style={[styles.root, customStyle]}>
      {card.thumbnail ?
        <View style={styles.image} onPress={() => handleCardPress({ action: card.action, cardId: card.cardId })}>
          <Avatar
            key={path(['thumbnail', 'url64p'])(card)}
            thumbnailSource={{ uri: path(['thumbnail', 'url64p'])(card) }}
            imageSource={{ uri: path(['thumbnail', 'url64p'])(card) }}
          />
        </View>
      : null}

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerTitle} onPress={() => handleCardPress({ action: card.action, cardId: card.cardId })}>
          <Text>{card.title}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerIcon} onPress={() => usersDeleteCardRequest({ cardId: card.cardId })}>
          <CloseIcon fill="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

FeedCard.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 12,
    margin: 12,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    marginRight: 12,
  },
})

export default FeedCard
