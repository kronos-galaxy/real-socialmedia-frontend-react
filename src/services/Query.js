import { graphqlOperation } from '@aws-amplify/api'
import { getContext, race, delay, retry } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import gql from 'graphql-tag'

const emitterWithCache = (emitter) => (data) => {
  emitter(data)
}

const emitterWitoutCache = (emitter) => (data) => {
  if (data.loading) return
  emitter(data)
  emitter(END)
}

export const handleEventChannel = (AppSync) => (query, variables, { cached } = {}) => () =>
  eventChannel(emitter => {
    const subscriberNext = (cached) ? emitterWithCache(emitter) : emitterWitoutCache(emitter)

    /**
     * 
     */
    const subscriberError = (error) => {
      emitter({
        data: {},
        loading: false,
        networkStatus: 7,
        stale: false,
        error: error.message,
      })
      emitter(END)
    }
  
    const subscription = AppSync.watchQuery({
      query: gql(query),
      fetchPolicy: 'cache-and-network',
      variables,
      errorPolicy: 'none',
    })
    .subscribe({
      next: subscriberNext,
      error: subscriberError,
    })
    
    return () => {
      subscription.unsubscribe()
    }
  })

export function* _apiRequest({ query, payload }) {
  const AwsAPI = yield getContext('AwsAPI')

  const { api, timeout } = yield race({
    api: AwsAPI.graphql(graphqlOperation(query, payload)),
    timeout: delay(10000)
  })

  if (api) {
    return api
  } else {
    new Error('api timeout error')
  }
}

export function* apiRequest(query, payload) {
  return yield retry(3, 1000, _apiRequest, { query, payload })
}