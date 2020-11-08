import { expectSaga } from 'redux-saga-test-plan'
import * as actions from 'store/ducks/auth/actions'
import authSigninAnonymous from 'store/ducks/auth/saga/authSigninAnonymous'
import { testAsRootSaga } from 'tests/utils/helpers'

const success = {
  message: { code: 'GENERIC', text: 'Successfully created anonymous user', nativeError: '' },
  data: { type: 'AUTH_FLOW_SUCCESS' },
}

describe('authSigninAnonymous', () => {
  it('success', async () => {
    await expectSaga(testAsRootSaga(authSigninAnonymous))
      .put(actions.authFlowRequest({ allowAnonymous: true }))
      .put(actions.authSigninAnonymousSuccess(success))

      .dispatch(actions.authSigninAnonymousRequest())
      .dispatch(actions.authFlowSuccess())
      .silentRun()
  })

  describe('failure', () => {
    it('Failed to obtain flow', async () => {
      const nativeError = 'Failed to obtain flow'
      const message = { code: 'GENERIC', text: 'Failed to create anonymous user', nativeError }

      await expectSaga(testAsRootSaga(authSigninAnonymous))
        .put(actions.authFlowRequest({ allowAnonymous: true }))
        .not.put(actions.authSigninAnonymousSuccess(success))
        .put(actions.authSigninAnonymousFailure({ message }))

        .dispatch(actions.authSigninAnonymousRequest())
        .dispatch(actions.authFlowFailure())
        .silentRun()
    })
  })
})
