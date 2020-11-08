import { combineReducers } from 'redux'
import signup from 'store/ducks/signup/reducer'
import * as actions from 'store/ducks/signup/actions'
import * as selectors from 'store/ducks/signup/selectors'
import { applyActions } from 'tests/utils/helpers'

const reducer = combineReducers({ signup })

describe('Signup reducer', () => {
  describe('signupCreate', () => {
    it('initial state', () => {
      const state = reducer(undefined, { type: 'MOCK' })

      expect(selectors.signupCreate(state)).toEqual({
        status: 'idle',
        error: {},
        payload: {},
      })
    })

    it('loading', () => {
      const state = applyActions(
        [
          actions.signupCreateRequest({ a: 1, b: 2 }),
          actions.signupCreateRequest({ c: 3 }),
          actions.signupCreateRequest({ a: 4, b: 5 }),
        ],
        reducer,
      )

      expect(selectors.signupCreate(state)).toEqual({
        status: 'loading',
        error: {},
        payload: { a: 4, b: 5, c: 3 },
      })
    })

    it('success', () => {
      const state = reducer(undefined, actions.signupCreateSuccess())

      expect(selectors.signupCreate(state)).toEqual({
        status: 'success',
        error: {},
        payload: {},
      })
    })

    it('failure', () => {
      const message = 'Error Message'
      const state = reducer(undefined, actions.signupCreateFailure({ message }))

      expect(selectors.signupCreate(state)).toEqual({
        status: 'failure',
        error: message,
        payload: {},
      })
    })

    it('idle', () => {
      const state = applyActions(
        [
          actions.signupCreateSuccess({ message: 'Message' }),
          actions.signupCreateFailure({ message: 'Error' }),
          actions.signupCreateIdle(),
        ],
        reducer,
      )

      expect(selectors.signupCreate(state)).toEqual({
        status: 'idle',
        error: {},
        payload: {},
      })
    })
  })
})
