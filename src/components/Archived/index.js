import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
} from 'react-native'
import path from 'ramda/src/path'
import GridComponent from 'templates/Grid'
import GridItemComponent from 'templates/GridItem'
import CacheComponent from 'components/Cache'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Archived = ({
  t,
  theme,
  postsGetArchived,
  postsGetArchivedRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <ScrollView style={styling.root}>
      <GridComponent items={path(['data'])(postsGetArchived)}>
        {(post, priorityIndex) => (
          <GridItemComponent
            onPress={navigationActions.navigatePostMedia(navigation, { postId: post.postId, userId: post.postedBy.userId })}
            active={false}
            activeIcon={null}
            inactiveIcon={null}
          >
            <CacheComponent
              thread="archived"
              images={[
                [path(['image', 'url64p'])(post), true],
                [path(['image', 'url480p'])(post), true],
              ]}
              fallback={path(['image', 'url480p'])(post)}
              priorityIndex={priorityIndex}
              resizeMode="cover"
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
  },
})

Archived.defaultProps = {
  usersImagePostsGet: {},
}

Archived.propTypes = {
  theme: PropTypes.any,
  postsGetArchived: PropTypes.any,
  postsGetArchivedRequest: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withTheme(Archived))
