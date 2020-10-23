import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import UploadingItem from 'components/Uploading/Item'

const Uploading = ({ postsCreateQueue, postsCreateRequest, postsCreateIdle, user }) => (
  <View style={styles.uploading}>
    {Object.values(postsCreateQueue).map((post, key) => (
      <UploadingItem
        key={key}
        user={user}
        post={post}
        postsCreateRequest={postsCreateRequest}
        postsCreateIdle={postsCreateIdle}
      />
    ))}
  </View>
)

Uploading.propTypes = {
  postsCreateQueue: PropTypes.any,
  postsCreateRequest: PropTypes.func,
  postsCreateIdle: PropTypes.func,
  user: PropTypes.any,
}

const styles = StyleSheet.create({
  uploading: {
    flexWrap: 'wrap',
  },
})

export default Uploading
