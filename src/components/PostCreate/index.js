import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native'
import PostCreateForm from 'components/PostCreate/Form'
import FormLifetime from 'components/PostCreate/FormLifetime'
import FormAlbums from 'components/PostCreate/FormAlbums'
import SuccessComponent from 'components/PostCreate/Success'
import UploadingComponent from 'components/PostsList/Uploading'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const PostCreateComponent = ({
  theme,
  user,
  cameraCapture,
  postsCreateRequest,
  postsCreate,
  postsCreateIdle,
  handlePostPress,
  albumsGet,
  postsCreateQueue,
  type,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()

  if (!cameraCapture.data.length && type !== 'TEXT_ONLY') {
    navigation.setOptions({
      headerRight: () => null,
    })
  }

  return (
    <View style={styling.root}>
      <ScrollView keyboardShouldPersistTaps="never">
        {Object.values(postsCreateQueue).map((post, key) => (
          <UploadingComponent
            key={key}
            authUser={user}
            post={post}
            postsCreateRequest={postsCreateRequest}
            postsCreateIdle={postsCreateIdle}
          />
        ))}

        {cameraCapture.data.map((item, key) => (
          <View style={styling.form} key={key}>
            <PostCreateForm
              user={user}
              postsCreate={postsCreate}
              postsCreateRequest={postsCreateRequest}
              cameraCapture={item}
              handlePostPress={handlePostPress}
              formLifetime={FormLifetime}
              formAlbums={FormAlbums}
              albumsGet={albumsGet}
              postType={type}
            />
          </View>
        ))}

        {type === 'TEXT_ONLY' ?
          <View style={styling.form}>
            <PostCreateForm
              user={user}
              postsCreate={postsCreate}
              postsCreateRequest={postsCreateRequest}
              cameraCapture={{ data: {} }}
              handlePostPress={handlePostPress}
              formLifetime={FormLifetime}
              formAlbums={FormAlbums}
              albumsGet={albumsGet}
              postType={type}
            />
          </View>
        : null}

        {(
          !cameraCapture.data.length &&
          !Object.values(postsCreateQueue).filter(item => item.status === 'loading').length &&
          type === 'IMAGE'
        ) ?
          <SuccessComponent />
        : null}
      </ScrollView>
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

export default withTheme(PostCreateComponent)
