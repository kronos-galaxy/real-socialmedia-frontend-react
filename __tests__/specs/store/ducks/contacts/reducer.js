import { combineReducers } from 'redux'
import { applyActions } from 'tests/utils/helpers'
import contacts from 'store/ducks/contacts/reducer'
import * as actions from 'store/ducks/contacts/actions'
import * as selectors from 'store/ducks/contacts/selectors'

const reducer = combineReducers({ contacts })
const error = new Error('Error')

describe('Contacts reducer', () => {
  describe('contactsGet', () => {
    it('initial state', () => {
      const state = reducer(undefined, { type: 'MOCK_ACTION' })

      expect(selectors.contactsGet(state)).toEqual({
        error: '',
        status: 'idle',
        items: [],
      })
    })

    it('loading state', () => {
      const state = reducer(undefined, actions.contactsGetRequest())

      expect(selectors.contactsGet(state)).toEqual({
        error: '',
        status: 'loading',
        items: [],
      })
    })

    it('success state', () => {
      const items = [{ id: 1 }, { id: 2 }]
      const state = reducer(undefined, actions.contactsGetSuccess({ items }))

      expect(selectors.contactsGet(state)).toEqual({
        error: '',
        status: 'success',
        items,
      })
    })

    it('error state', () => {
      const state = reducer(undefined, actions.contactsGetFailure(error.message))

      expect(selectors.contactsGet(state)).toEqual({
        error: error.message,
        status: 'failure',
        items: [],
      })
    })

    it('clear error on request', () => {
      const state = applyActions([actions.contactsGetFailure(error.message), actions.contactsGetRequest()], reducer)

      expect(selectors.contactsGet(state)).toEqual({
        error: '',
        status: 'loading',
        items: [],
      })
    })

    it('clear items on error', () => {
      const items = [{ id: 1 }, { id: 2 }]
      const state = applyActions(
        [actions.contactsGetSuccess({ items }), actions.contactsGetFailure(error.message)],
        reducer,
      )

      expect(selectors.contactsGet(state)).toEqual({
        error: 'Error',
        status: 'failure',
        items: [],
      })
    })
  })

  describe('invited', () => {
    it('initial state', () => {
      const state = reducer(undefined, { type: 'MOCK_ACTION' })

      expect(selectors.invited(state)).toEqual({
        items: [],
      })
    })

    it('add user on success', () => {
      const state = applyActions(
        [
          actions.contactsInviteSuccess({ recordID: 1 }),
          actions.contactsInviteSuccess({ recordID: 2 }),
          actions.contactsInviteSuccess({ recordID: 3 }),
        ],
        reducer,
      )

      expect(selectors.invited(state)).toEqual({
        items: [1, 2, 3],
      })
    })
  })
})
