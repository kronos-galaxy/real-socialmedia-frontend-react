import {
  albumFragment,
} from 'store/fragments'

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
          ...albumFragment
        }
        nextToken
      }
    }
  }
  ${albumFragment}
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
