import {
  albumFragment,
} from 'store/fragments'

export const addAlbum = `
  mutation addAlbum(
    $albumId: ID!,
    $name: String!,
    $description: String
  ) {
    addAlbum(
      albumId: $albumId,
      name: $name,
      description: $description
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

export const editAlbum = ``

export const deleteAlbum = ``
