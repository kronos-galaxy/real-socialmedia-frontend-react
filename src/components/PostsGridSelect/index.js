import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import path from 'ramda/src/path'
import GridComponent from 'templates/Grid'
import GridItemComponent from 'templates/GridItem'
import ImageComponent from 'templates/Image'
import CheckedIcon from 'assets/svg/other/Checked'
import UncheckedIcon from 'assets/svg/other/Unchecked'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const PostsGridSelect = ({
  theme,
  usersImagePostsGet,
  handlePostPress,
  selectedPost,
  usersEditProfileRequest,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()

  navigation.setOptions({
    headerRight: () => selectedPost.postId ? (
      <TouchableOpacity onPress={usersEditProfileRequest}>
        <Text style={styling.headerRight}>Update</Text>
      </TouchableOpacity>
    ) : null,
  })

  return (
    <ScrollView style={styling.root}>
      <GridComponent items={path(['data'])(usersImagePostsGet)}>
        {(post, priorityIndex) => (
          <GridItemComponent
            onPress={() => handlePostPress(post)}
            active={(
              selectedPost.postId === post.postId
            )}
            activeIcon={<CheckedIcon fill={theme.colors.iconPrimary} />}
            inactiveIcon={<UncheckedIcon fill={theme.colors.iconPrimary} />}
          >
            <ImageComponent
              thumbnailSource={{ uri: path(['image', 'url64p'])(post) }}
              imageSource={{ uri: path(['image', 'url480p'])(post) }}
              priorityIndex={priorityIndex}
            />
          </GridItemComponent>
        )}
      </GridComponent>
    </ScrollView>
  )
}
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    flexWrap: 'wrap',
  },
  headerRight: {
    paddingHorizontal: theme.spacing.base,
    fontSize: 16,
    fontWeight: '700',
    color: '#3498db',
  },
})

PostsGridSelect.defaultProps = {
  usersImagePostsGet: {},
}

PostsGridSelect.propTypes = {
  theme: PropTypes.any,
  usersImagePostsGet: PropTypes.any,
  handlePostPress: PropTypes.any,
  selectedPost: PropTypes.any,
}

export default withTheme(PostsGridSelect)
