import { createSelector } from 'reselect'
import update from 'immutability-helper'
import pathOr from 'ramda/src/pathOr'

export const usersGetProfileSelector = createSelector(
  state => state.users.usersGetProfile,
  usersGetProfile => update(usersGetProfile, {
    data: {
      $set: {
        username: pathOr('', ['data', 'username'], usersGetProfile),
        fullName: pathOr('', ['data', 'fullName'], usersGetProfile),
        bio: pathOr('', ['data', 'bio'], usersGetProfile),
        email: pathOr('', ['data', 'email'], usersGetProfile),
        phoneNumber: pathOr('', ['data', 'phoneNumber'], usersGetProfile),
        privacyStatus: pathOr('', ['data', 'privacyStatus'], usersGetProfile),
        followCountsHidden: pathOr('', ['data', 'followCountsHidden'], usersGetProfile),
        photoUrl: pathOr('', ['data', 'photoUrl'], usersGetProfile),
        photoUrl64p: pathOr('', ['data', 'photoUrl64p'], usersGetProfile),
        photoUrl480p: pathOr('', ['data', 'photoUrl480p'], usersGetProfile),
        photoUrl1080p: pathOr('', ['data', 'photoUrl1080p'], usersGetProfile),
        photoUrl4k: pathOr('', ['data', 'photoUrl4k'], usersGetProfile),
      },
    },
  })
)