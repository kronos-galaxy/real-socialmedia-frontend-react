import { userFragment } from 'store/fragments'
import * as usersSingle from 'store/ducks/users/queries/single'

export const findUsers = `
  query findUsers($emails: [AWSEmail!]!, $phoneNumbers: [AWSPhone!]!) {
    findUsers(emails: $emails, phoneNumbers: $phoneNumbers) {
      items {
        ...userFragment
      }
    }
  }
  ${userFragment}
`
export const grantUserSubscriptionBonus = `
  mutation grantUserSubscriptionBonus {
    grantUserSubscriptionBonus {
      ...singleUserFragment
    }
  }
  ${usersSingle.singleUserFragment}
`
