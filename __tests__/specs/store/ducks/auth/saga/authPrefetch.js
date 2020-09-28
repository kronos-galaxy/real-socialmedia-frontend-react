import { expectSaga } from 'redux-saga-test-plan'
import * as actions from 'store/ducks/auth/actions'
import authPrefetch from 'store/ducks/auth/saga/authPrefetch'
import { testAsRootSaga } from 'tests/utils/helpers'

describe('Auth prefetch', () => {
  it('run saga', async () => {
    await expectSaga(testAsRootSaga(authPrefetch)).dispatch(actions.authPrefetchRequest()).run()
  })
})
