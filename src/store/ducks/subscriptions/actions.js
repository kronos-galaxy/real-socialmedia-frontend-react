import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/subscriptions/constants'

export const subscriptionMainStart = createAction(constants.SUBSCRIPTION_MAIN_START)
export const subscriptionMainStop = createAction(constants.SUBSCRIPTION_MAIN_STOP)
export const subscriptionMainError = createAction(constants.SUBSCRIPTION_MAIN_ERROR)

export const subscriptionPollStart = createAction(constants.SUBSCRIPTION_POLL_START)
export const subscriptionPollStop = createAction(constants.SUBSCRIPTION_POLL_STOP)
export const subscriptionPollError = createAction(constants.SUBSCRIPTION_POLL_ERROR)
