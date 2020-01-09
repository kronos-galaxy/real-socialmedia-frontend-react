import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import * as layoutActions from 'store/ducks/layout/actions'
import { withNavigation } from 'react-navigation'
import path from 'ramda/src/path'
import useDebounce from 'react-use/lib/useDebounce'

const PostMediaService = ({ children, navigation, ...props }) => {
  const dispatch = useDispatch()
  const postId = path(['postId'])(navigation.getParam('post'))
  const userId = path(['postedBy', 'userId'])(navigation.getParam('post'))
  const postsSingleGet = useSelector(state => state.posts.postsSingleGet)
  const postsDelete = useSelector(state => state.posts.postsDelete)
  const postsGetTrendingPosts = useSelector(state => state.posts.postsGetTrendingPosts)
  const postsGetCache = useSelector(state => state.posts.postsGetCache)

  const layoutPostMediaItem = useSelector(state => state.layout.layoutPostMediaItem)
  const layoutPostMediaScroll = useSelector(state => state.layout.layoutPostMediaScroll)

  const [viewMore, setViewMore] = useState(true)
  const feedRef = useRef()

  const postsSingleGetRequest = ({ postId }) =>
    dispatch(postsActions.postsSingleGetRequest({ postId }))

  useEffect(() => {
    dispatch(postsActions.postsSingleGetRequest({ postId }))
  }, [postId])

  const layoutPostMediaScrollSuccess = (payload) =>
    dispatch(layoutActions.layoutPostMediaScrollSuccess(payload))

  const layoutPostMediaItemSuccess = (payload) =>
    dispatch(layoutActions.layoutPostMediaItemSuccess(payload))

  useEffect(() => {
    dispatch(postsActions.postsReportPostViewsRequest({ postIds: [postId] }))
    dispatch(layoutActions.layoutPostMediaItemIdle())
    dispatch(layoutActions.layoutPostMediaScrollIdle())
  }, [])

  useEffect(() => {
    if (postsDelete.status === 'success') {
      dispatch(postsActions.postsDeleteIdle())
    }
    if (postsDelete.status === 'loading') {
      navigation.goBack()
    }
  }, [postsDelete.status])

  useDebounce(() => {
    const range = Object.keys(layoutPostMediaItem.data)
    const goal = layoutPostMediaScroll.data.y
    
    if (!range.length || !goal) { return }
    
    const closest = range.reduce((prev, curr) =>
      (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev)
    )
    
    const closestPostId = layoutPostMediaItem.data[closest].postId
    dispatch(postsActions.postsReportPostViewsRequest({ postIds: [closestPostId] }))

    setViewMore(postId === closestPostId)
  }, 1000, [layoutPostMediaScroll.data.y])

  const handleViewMorePosts = () => {
    const range = Object.keys(layoutPostMediaItem.data).sort((a, b) => a - b)
    const offset = parseInt(range[1], 10) - parseInt(range[0], 10)
    feedRef.current.scrollToOffset({ animated: true, offset })
  }

  return children({
    postsSingleGet: postsServices.cachedPostsSingleGet(postsSingleGet, navigation.getParam('post')),
    postsGetTrendingPosts: postsServices.cachedPostsGetTrendingPosts(postsGetTrendingPosts, postId),
    postsSingleGetRequest,
    ...props,
    postsMediaFeedGet: postsServices.cachedPostsMediaFeedGet(postsGetCache, userId, postId),
    onScroll: layoutPostMediaScrollSuccess,
    layoutPostMediaItemSuccess,
    layoutPostMediaScroll,
    viewMore,
    handleViewMorePosts,
    feedRef,
    routeName: navigation.getParam('routeName'),
  })
}

export default withNavigation(PostMediaService)
