import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
} from 'react-native'
import FormComponent from 'components/Comments/Form'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import CommentComponent from 'components/Comments/Comment'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Comments = ({
  t,
  theme,
  user,
  commentsAdd,
  commentsAddRequest,
  commentsDeleteRequest,
  postsCommentsGet,
  marginBottom,
  postsSingleGet,
  onViewableItemsChangedRef,
  viewabilityConfigRef,
  handleUserReply,

  handleFormSubmit,
  handleFormTransform,
  formSubmitLoading,
  formSubmitDisabled,
  formInitialValues,
}) => {
  const styling = styles(theme)
  
  const pseudoCommentVisibility = path(['text', 'length'])(postsSingleGet.data)
  const pseudoComment = {
    ...postsSingleGet.data,
    commentedBy: path(['postedBy'])(postsSingleGet.data),
    commentedAt: path(['postedAt'])(postsSingleGet.data),
  }

  return (
    <View style={styling.root}>
      <FlatList
        style={styling.comments}
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.border}
            refreshing={postsCommentsGet.status === 'loading'}
          />
        }
        keyExtractor={item => item.commentId}
        data={pathOr([], ['data'])(postsCommentsGet)}
        onViewableItemsChanged={onViewableItemsChangedRef.current}
        viewabilityConfig={viewabilityConfigRef.current}
        ListHeaderComponent={pseudoCommentVisibility ?
          <View style={styling.comment} key="desc">
            <CommentComponent
              comment={pseudoComment}
              handleUserReply={handleUserReply}
            />
          </View>
        : null}
        renderItem={({ item: comment, index }) => (
          <View style={styling.comment}>
            <CommentComponent
              comment={comment}
              commentsDeleteRequest={() => commentsDeleteRequest({ commentId: comment.commentId })}
              handleUserReply={handleUserReply}
              deletable={(
                path(['postedBy', 'userId'])(postsSingleGet.data) === user.userId ||
                path(['commentedBy', 'userId'])(comment) === user.userId
              )}
            />
          </View>
        )}
      />
      <View style={{ marginBottom }}>
        <FormComponent
          handleFormSubmit={handleFormSubmit}
          handleFormTransform={handleFormTransform}
          formSubmitLoading={formSubmitLoading}
          formSubmitDisabled={formSubmitDisabled}
          formInitialValues={formInitialValues}
        />
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  comments: {
    flex: 1,
  },
  comment: {
    paddingHorizontal: theme.spacing.base,
    marginBottom: theme.spacing.base,
  },
  form: {
    ...ifIphoneX({
      paddingBottom: 40,
    }, {
      paddingBottom: 0,
    }),
  }
})

Comments.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  user: PropTypes.any,
  commentsAdd: PropTypes.any,
  commentsAddRequest: PropTypes.any,
  commentsDeleteRequest: PropTypes.any,
  postsCommentsGet: PropTypes.any,
  marginBottom: PropTypes.any,
  postsSingleGet: PropTypes.any,
  onViewableItemsChangedRef: PropTypes.any,
  viewabilityConfigRef: PropTypes.any,
  handleUserReply: PropTypes.any,

  handleFormSubmit: PropTypes.any,
  handleFormTransform: PropTypes.any,
  formSubmitLoading: PropTypes.any,
  formSubmitDisabled: PropTypes.any,
  formInitialValues: PropTypes.any,
}

export default withTranslation()(withTheme(Comments))
