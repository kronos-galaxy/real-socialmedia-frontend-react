import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PostEditForm from 'components/PostEdit/Form'
import FormLifetime from 'components/PostEdit/FormLifetime'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const PostEditComponent = ({
  theme,
  navigation,
  postsEditRequest,
  postsEdit,
  postsSingleGet,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <KeyboardAwareScrollView>
        <View style={styling.form}>
          <PostEditForm
            navigation={navigation}
            postsEdit={postsEdit}
            postsEditRequest={postsEditRequest}
            postsSingleGet={postsSingleGet}
            formLifetime={FormLifetime}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

PostEditComponent.propTypes = {
  theme: PropTypes.any,
  navigation: PropTypes.any,
  postsEditRequest: PropTypes.any,
  postsEdit: PropTypes.any,
  postsSingleGet: PropTypes.any,
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
  withTheme(PostEditComponent)
)
