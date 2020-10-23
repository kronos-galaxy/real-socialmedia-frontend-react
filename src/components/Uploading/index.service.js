import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import useUpload from 'services/providers/Upload'

const UploadingService = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUserSelector)
  const postsCreateQueue = useSelector((state) => state.posts.postsCreateQueue)

  const { handlePostUpload } = useUpload({
    handlePostUploadStarted: () => {},
  })


  const { postsCreateRequest, postsCreateIdle } = useMemo(() => ({
    postsCreateRequest: handlePostUpload,
    postsCreateIdle: (payload) => dispatch(postsActions.postsCreateIdle(payload)),
  }), [])

  return children({
    postsCreateQueue,
    postsCreateRequest,
    postsCreateIdle,
    user,
  })
}

export default UploadingService
