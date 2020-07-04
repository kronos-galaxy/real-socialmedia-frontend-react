import {
  albumFragment,
} from 'store/fragments'

import * as grid from 'store/ducks/albums/queries/grid'

export const addAlbum = `
  mutation addAlbum(
    $albumId: ID!,
    $name: String!
  ) {
    addAlbum(
      albumId: $albumId,
      name: $name
    ) {
      ...albumFragment
    }
  }
  ${albumFragment}
`

export const getAlbums = `
  query getAlbums($userId: ID!) {
    user(userId: $userId) {
      albums(limit: 10) {
        items {
          ...gridAlbumFragment
        }
        nextToken
      }
    }
  }
  ${grid.gridAlbumFragment}
`

export const editAlbum = `
  mutation editAlbum(
    $albumId: ID!,
    $name: String,
  ) {
    editAlbum(
      albumId: $albumId,
      name: $name,
    ) {
      ...albumFragment
    }
  }
  ${albumFragment}
`

export const deleteAlbum = `
  mutation deleteAlbum($albumId: ID!) {
    deleteAlbum (albumId: $albumId) {
      ...albumFragment
    }
  }
  ${albumFragment}
`
