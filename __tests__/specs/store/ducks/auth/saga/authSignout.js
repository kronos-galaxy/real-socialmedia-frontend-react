import { getContext } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import authSignout from 'store/ducks/auth/saga/authSignout'
import * as actions from 'store/ducks/auth/actions'
import { testAsRootSaga } from 'tests/utils/helpers'

jest.mock('services/AWS', () => ({ federatedGoogleSignout: jest.fn() }))

describe('authSignout', () => {
  it('reset navigation history on signout', async () => {
    const navigation = { current: { reset: jest.fn() } }

    await expectSaga(testAsRootSaga(authSignout))
      .provide([[getContext('ReactNavigationRef'), navigation]])

      .dispatch(actions.authSignoutSuccess())
      .silentRun()

    expect(navigation.current.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'Auth' }] })
  })
})
