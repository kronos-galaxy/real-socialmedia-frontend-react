import { combineReducers } from 'redux'
import users from 'store/ducks/users/reducer'
import * as actions from 'store/ducks/users/actions'
import * as selectors from 'store/ducks/users/selectors'

const reducer = combineReducers({ users })

describe('Users reducer', () => {
  describe('usersChangeAvatar', () => {
    it('initial state', () => {
      const state = reducer(undefined, { type: 'MOCK' })

      expect(selectors.usersChangeAvatar(state)).toEqual({ status: 'idle' })
    })

    it('loading', () => {
      const state = reducer(undefined, actions.usersChangeAvatarRequest())

      expect(selectors.usersChangeAvatar(state)).toEqual({ status: 'loading' })
    })

    it('success', () => {
      const state = reducer(undefined, actions.usersChangeAvatarSuccess())

      expect(selectors.usersChangeAvatar(state)).toEqual({ status: 'success' })
    })

    it('failure', () => {
      const state = reducer(undefined, actions.usersChangeAvatarFailure())

      expect(selectors.usersChangeAvatar(state)).toEqual({ status: 'failure' })
    })
  })
})
