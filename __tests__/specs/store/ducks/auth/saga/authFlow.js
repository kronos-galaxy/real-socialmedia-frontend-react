import { getContext } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import * as actions from 'store/ducks/auth/actions'
import authFlow from 'store/ducks/auth/saga/authFlow'
import { testAsRootSaga, testNavigate } from 'tests/utils/helpers'

describe('Auth flow', () => {
  it('authPrefetchRequest on success', async () => {
    await expectSaga(testAsRootSaga(authFlow))
      .put(actions.authPrefetchRequest())

      .dispatch(actions.authFlowSuccess())
      .silentRun()
  })

  it('redirect to auth home on failure', async () => {
    const navigation = { navigate: jest.fn() }

    await expectSaga(testAsRootSaga(authFlow))
      .provide([[getContext('ReactNavigationRef'), { current: navigation }]])
      .dispatch(actions.authFlowFailure())
      .silentRun()

    testNavigate(navigation, 'Auth.AuthHome')
  })
})
