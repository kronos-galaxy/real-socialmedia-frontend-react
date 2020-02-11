import { Keyboard } from 'react-native'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import { withNavigation } from 'react-navigation'
import uuid from 'uuid/v4'
import path from 'ramda/src/path'
import { ifIphoneX } from 'react-native-iphone-x-helper'

const CommentsService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const postId = path(['postId'])(navigation.getParam('post'))
  const commentsAdd = useSelector(state => state.posts.commentsAdd)
  const postsCommentsGet = useSelector(state => state.posts.postsCommentsGet)
  const postsCommentsGetCache = useSelector(state => state.posts.postsCommentsGetCache)

  useEffect(() => {
    dispatch(postsActions.postsCommentsGetRequest({ postId }))
  }, [])

  useEffect(() => {
    dispatch(postsActions.postsCommentsGetRequest({ postId }))
    dispatch(postsActions.postsSingleGetRequest({ postId }))
  }, [commentsAdd.status === 'success'])

  const commentsAddRequest = ({ text }) => {
    const commentId = uuid()
    dispatch(postsActions.commentsAddRequest({
      commentId,
      postId,
      text,
    }))
  }

  /**
   * Keyboard movement calculator 
   */
  const [offset, setOffset] = useState(0)

  const keyboardWillShow = (event) => {
    setOffset(event.endCoordinates.height - ifIphoneX(40, 0) + 12)
  }

  const keyboardWillHide = (event) => {
    setOffset(0)
  }

  useEffect(() => {
    const keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', keyboardWillShow)
    const keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', keyboardWillHide)

    return () => {
      keyboardWillShowSub.remove()
      keyboardWillHideSub.remove()
    }
  }, [])

  const marginBottom = offset + ifIphoneX(40, 0)
  
  return children({
    commentsAdd,
    commentsAddRequest,
    postsCommentsGet: postsServices.cachedPostsGet(postsCommentsGet, postsCommentsGetCache, postId),
    marginBottom,
  })
}

export default withNavigation(CommentsService)
