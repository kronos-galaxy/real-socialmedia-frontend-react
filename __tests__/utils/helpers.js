import { all } from 'redux-saga/effects'

export const applyActions = (actions, reducer) => {
  let state

  actions.forEach((action) => {
    state = reducer(state, action)
  })

  return state
}

export const sleep = () => new Promise((r) => setTimeout(r, 0))

export function testAsRootSaga(saga) {
  return function* pseudoRootSaga() {
    yield all(saga())
  }
}
