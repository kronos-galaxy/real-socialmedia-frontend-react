import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import CloseIcon from 'assets/svg/post/Close'
import { Text } from 'react-native-paper'

const FeedCard = ({
  borderColor,
  backgroundColor,
  handleCardPress,
}) => ({ item: card }) => {
  const customStyle = {
    borderColor,
    backgroundColor,
  }

  return (
    <View style={[styles.root, customStyle]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerTitle} onPress={() => handleCardPress()}>
          <Text>{card.title}</Text>
        </TouchableOpacity>

        <View style={styles.headerIcon}>
          <CloseIcon fill="#ffffff" />
        </View>
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
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default FeedCard
