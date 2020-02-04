import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PostCreateForm from 'components/PostCreate/Form'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const PostCreateComponent = ({
  theme,
  user,
  cameraCapture,
  postsCreateRequest,
  postsCreate,
  handlePostPress,
  albumsGet,
  albumId,
  setAlbumId,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <KeyboardAwareScrollView>
        <View style={styling.form}>
          <PostCreateForm
            user={user}
            postsCreate={postsCreate}
            postsCreateRequest={postsCreateRequest}
            cameraCapture={cameraCapture}
            handlePostPress={handlePostPress}
            albumsGet={albumsGet}
            albumId={albumId}
            setAlbumId={setAlbumId}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

PostCreateComponent.propTypes = {
  theme: PropTypes.any,
  cameraCapture: PropTypes.any,
  postsCreateRequest: PropTypes.any,
  postsCreate: PropTypes.any,
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  form: {
    padding: theme.spacing.base,
  },
})

export default withNavigation(
  withTheme(PostCreateComponent)
)
