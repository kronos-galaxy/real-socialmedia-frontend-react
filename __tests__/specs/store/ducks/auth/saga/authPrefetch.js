import { expectSaga } from 'redux-saga-test-plan'
import * as authActions from 'store/ducks/auth/actions'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import authPrefetch from 'store/ducks/auth/saga/authPrefetch'
import { testAsRootSaga } from 'tests/utils/helpers'

describe('Auth prefetch', () => {
  it('guest', async () => {
    await expectSaga(testAsRootSaga(authPrefetch))
      .withState({
        auth: { authToken: { meta: { type: 'COGNITO_GUEST' } } },
      })

      .put(postsActions.postsFeedGetRequest({ limit: 20 }))
      .put(postsActions.postsGetTrendingPostsRequest({ limit: 100 }))
      .put(usersActions.usersGetCardsRequest())

      .dispatch(authActions.authPrefetchRequest())
      .silentRun()
  })

  it('authorized', async () => {
    await expectSaga(testAsRootSaga(authPrefetch))
      .withState({
        auth: { authToken: { meta: { type: 'COGNITO_AUTHENTICATED' } } },
      })

      .put(postsActions.postsFeedGetRequest({ limit: 20 }))
      .put(postsActions.postsGetTrendingPostsRequest({ limit: 100 }))
      .put(usersActions.usersGetCardsRequest())

      .dispatch(authActions.authPrefetchRequest())
      .silentRun()
  })
})
