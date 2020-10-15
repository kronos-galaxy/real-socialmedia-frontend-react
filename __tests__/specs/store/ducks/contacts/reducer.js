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
      const state = reducer(undefined, actions.contactsGetFailure(error))

      expect(selectors.contactsGet(state)).toEqual({
        error: error.message,
        status: 'failure',
        items: [],
      })
    })

    it('clear error on request', () => {
      const state = applyActions([actions.contactsGetFailure(error), actions.contactsGetRequest()], reducer)

      expect(selectors.contactsGet(state)).toEqual({
        error: '',
        status: 'loading',
        items: [],
      })
    })

    it('clear items on error', () => {
      const items = [{ id: 1 }, { id: 2 }]
      const state = applyActions(
        [actions.contactsGetSuccess({ items }), actions.contactsGetFailure(error)],
        reducer,
      )

      expect(selectors.contactsGet(state)).toEqual({
        error: 'Error',
        status: 'failure',
        items: [],
      })
    })
  })

  describe('contactsInvite', () => {
    it('initial state', () => {
      const state = reducer(undefined, { type: 'MOCK_ACTION' })

      expect(selectors.contactsInvite(state)).toEqual({
        error: '',
        invited: {},
        requested: {},
      })
    })

    it('add user on success', () => {
      const state = applyActions(
        [
          actions.contactsInviteSuccess({ contactId: 1 }),
          actions.contactsInviteSuccess({ contactId: 2 }),
          actions.contactsInviteSuccess({ contactId: 3 }),
        ],
        reducer,
      )

      expect(selectors.contactsInvite(state)).toEqual({
        error: '',
        invited: { 1: true, 2: true, 3: true },
        requested: {},
      })
    })

    it('add item to requested list', () => {
      const state = applyActions(
        [
          actions.contactsInviteRequest({ contactId: 1 }),
          actions.contactsInviteRequest({ contactId: 2 }),
          actions.contactsInviteRequest({ contactId: 3 }),
        ],
        reducer,
      )

      expect(selectors.contactsInvite(state)).toEqual({
        error: '',
        invited: {},
        requested: { 1: true, 2: true, 3: true },
      })
    })

    it('remove item from requested list on success or fail request', () => {
      const state = applyActions(
        [
          actions.contactsInviteRequest({ contactId: 1 }),
          actions.contactsInviteRequest({ contactId: 2 }),
          actions.contactsInviteRequest({ contactId: 3 }),

          actions.contactsInviteFailure({ contactId: 1 }),
          actions.contactsInviteSuccess({ contactId: 2 }),
        ],
        reducer,
      )

      expect(selectors.contactsInvite(state)).toEqual({
        error: '',
        invited: { 2: true },
        requested: { 3: true },
      })
    })
  })
})
