import { graphqlOperation } from '@aws-amplify/api'
import { getContext } from 'redux-saga/effects'
import path from 'ramda/src/path'

export function* apiRequest(query, payload) {
  const AwsAPI = yield getContext('AwsAPI')
  return yield AwsAPI.graphql(graphqlOperation(query, payload))
}

export function getPrimaryGraphqlError(error) {
  const firstError = path(['errors', '0'])(error)

  if (!firstError || firstError.name !== 'GraphQLError') {
    return false
  }

  return firstError
}

export function getPrimaryClientError(error) {
  const firstError = path(['errors', '0'])(error)

  if (!firstError || firstError.errorType !== 'ClientError') {
    return false
  }

  return firstError
}
