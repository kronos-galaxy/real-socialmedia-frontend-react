import {
  albumFragment,
} from 'store/fragments'

import * as albumsGrid from 'store/ducks/albums/queries/grid'
import * as albumsSingle from 'store/ducks/albums/queries/single'

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

export const getAlbum = `
  query getAlbum($albumId: ID!, $limit: Int = 10, $nextToken: String = null) {
    album(albumId: $albumId) {
      ...singleAlbumFragment

      posts(limit: $limit, nextToken: $nextToken) {
        items {
          ...singleAlbumPostFragment
        }
        nextToken
      }
    }
  }
  ${albumsSingle.singleAlbumFragment}
  ${albumsSingle.singleAlbumPostFragment}
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
  ${albumsGrid.gridAlbumFragment}
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
