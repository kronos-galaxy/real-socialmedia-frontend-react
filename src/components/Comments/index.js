import React, { useRef } from 'react'
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
import dayjs from 'dayjs'
import SwipableTemplate from 'templates/Swipable'
import useRefs from 'services/providers/Refs'

import PreviewServiceComponent from 'components/Preview/index.service'
import PreviewPostComponent from 'components/Preview/Post'
import PreviewUserComponent from 'components/Preview/User'

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
  commentsFlagRequest,
  postsCommentsGet,
  marginBottom,
  postsSingleGet,
  onViewableItemsChangedRef,
  viewabilityConfigRef,
  handleUserReply,
  commentsRef,

  handleFormSubmit,
  handleFormTransform,
  formSubmitLoading,
  formSubmitDisabled,
  formInitialValues,
  inputRefs,
  rowRefs,
}) => {
  const styling = styles(theme)
  const commentRefs = useRefs({ keyPath: ['commentId'] })

  const pseudoCommentVisibility = path(['text', 'length'])(postsSingleGet.data)
  const pseudoComment = {
    ...postsSingleGet.data,
    commentedBy: path(['postedBy'])(postsSingleGet.data),
    commentedAt: path(['postedAt'])(postsSingleGet.data),
  }

  return (
    <View style={styling.root}>
      <FlatList
        ref={commentsRef}
        style={styling.comments}
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.border}
            refreshing={postsCommentsGet.status === 'loading'}
          />
        }
        keyExtractor={item => item.commentId}
        data={pathOr([], ['data'])(postsCommentsGet).reverse()}
        onViewableItemsChanged={onViewableItemsChangedRef.current}
        viewabilityConfig={viewabilityConfigRef.current}
        ListHeaderComponent={(
          <React.Fragment>
            <PreviewServiceComponent>
              {({ postPreviewProps, postUserProps }) => (
                <React.Fragment>
                  <PreviewPostComponent {...postPreviewProps} />
                  <PreviewUserComponent {...postUserProps} />
                </React.Fragment>
              )}
            </PreviewServiceComponent>

            {pseudoCommentVisibility ?
              <SwipableTemplate>
                <View style={styling.comment} key="desc">
                  <CommentComponent
                    comment={pseudoComment}
                    handleUserReply={handleUserReply}
                  />
                </View>
              </SwipableTemplate>
            : null}
          </React.Fragment>
        )}
        renderItem={({ item: comment, index }) => {
          const tappable = (
            path(['postedBy', 'userId'])(postsSingleGet.data) === user.userId ||
            path(['commentedBy', 'userId'])(comment) === user.userId
          )
          const handleDeletePress = () => {
            commentsDeleteRequest({ commentId: comment.commentId })
            commentRefs.getRef(comment).close()
          }
          const handleReportPress = () => {
            commentsFlagRequest({ commentId: comment.commentId })
            commentRefs.getRef(comment).close()
          }
          const rowProps = tappable ? ({
            handleReportPress,
            handleDeletePress,
          }) : ({
            handleReportPress,
          })
          return (
            <SwipableTemplate
              rowRef={commentRefs.createRef(comment)}
              rowProps={rowProps}
            >
              <View style={styling.comment}>
                <CommentComponent
                  comment={comment}
                  handleTap={() => commentRefs.getRef(comment).openRight()}
                  handleUserReply={handleUserReply}
                  tappable={true}
                />
              </View>
            </SwipableTemplate>
          )}
        }
      />
      <View style={{ marginBottom }}>
        <FormComponent
          handleFormSubmit={handleFormSubmit}
          handleFormTransform={handleFormTransform}
          formSubmitLoading={formSubmitLoading}
          formSubmitDisabled={formSubmitDisabled}
          formInitialValues={formInitialValues}
          inputRefs={inputRefs}
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
  },
  content: {
    padding: theme.spacing.base,
  },
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
