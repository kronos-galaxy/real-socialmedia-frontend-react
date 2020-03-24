import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import path from 'ramda/src/path'
import GridComponent from 'templates/Grid'
import GridItemComponent from 'templates/GridItem'
import ImageComponent from 'templates/Image'
import CheckedIcon from 'assets/svg/other/Checked'
import UncheckedIcon from 'assets/svg/other/Unchecked'
import { Caption } from 'react-native-paper'
import HeaderRight from 'navigation/HeaderRight'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const PostsGridSelect = ({
  t,
  theme,
  usersImagePostsGet,
  handlePostPress,
  selectedPost,
  usersEditProfileRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  navigation.setOptions({
    headerRight: () => <HeaderRight onPress={usersEditProfileRequest} title="Update" hidden={!selectedPost.postId} />,
  })

  return (
    <View style={styling.root}>
      <View style={styling.info}>
        <Caption>{t('You can only set profile photo from your existing posts')}</Caption>
      </View>
      <ScrollView>
        <GridComponent items={path(['data'])(usersImagePostsGet)}>
          {(post, priorityIndex) => (
            <GridItemComponent
              onPress={() => handlePostPress(post)}
              active={selectedPost.postId === post.postId}
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
    </View>
  )
}
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    flexWrap: 'wrap',
  },
  info: {
    padding: theme.spacing.base,
    alignItems: 'center',
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

export default withTranslation()(withTheme(PostsGridSelect))
