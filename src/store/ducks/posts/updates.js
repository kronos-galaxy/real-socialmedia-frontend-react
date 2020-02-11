import update, { extend } from 'immutability-helper'

/**
 *
 */
extend('$feedPostUpdate', ({ postId, post }, original) => {
  const index = original.findIndex(post => post.postId === postId)
  if (index === -1) {
    return original
  }
  return update(original, {
    [index]: {
      $set: post,
    },
  })
})

/**
 *
 */
extend('$feedPostLikeStatusUpdate', ({ postId, likeStatus }, original) => {
  const index = original.findIndex(post => post.postId === postId)
  if (index === -1) {
    return original
  }
  return update(original, {
    [index]: {
      likeStatus: { $set: likeStatus },
    },
  })
})

/**
 *
 */
extend('$singlePostLikeStatusUpdate', ({ postId, likeStatus }, original) => {
  if (original.postId !== postId) {
    return original
  }
  return update(original, {
    likeStatus: { $set: likeStatus },
  })
})

/**
 *
 */
extend('$feedPostRemove', ({ postId }, original) => {
  const index = original.findIndex(post => post.postId === postId)
  if (index === -1) {
    return original
  }
  return update(original, {
    $splice: [[index, 1]],
  })
})
