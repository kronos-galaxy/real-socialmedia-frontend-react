export const userFragment = `
  fragment userFragment on User {
    userId
    username
    photoUrl
    photoUrl64p
    photoUrl480p
    photoUrl1080p
    photoUrl4k
    privacyStatus
    followedStatus
    followerStatus
    followedCount
    followerCount
    followCountsHidden
    viewCountsHidden
    commentsDisabled
    likesDisabled
    sharingDisabled
    verificationHidden
    postCount
    fullName
    themeCode
    bio
    email
    phoneNumber
    languageCode
    signedUpAt
    postViewedByCount
    blockedStatus
    blockerStatus
  }
`

export const mediaObjectFragment = `
  fragment mediaObjectFragment on MediaObject {
    mediaId
    mediaType
    mediaStatus
    url
    url64p
    url480p
    url1080p
    url4k
    uploadUrl
    width
    height
    isVerified
  }
`

export const postFragment = `
  fragment postFragment on Post {
    postId
    postedAt
    postedBy {
      ...userFragment
    }
    expiresAt
    text
    textTaggedUsers {
      tag
      user {
        ...userFragment
      }
    }
    mediaObjects {
      ...mediaObjectFragment
    }
    likeStatus
    commentsDisabled
    likesDisabled
    sharingDisabled
    verificationHidden
    onymousLikeCount
    anonymousLikeCount
    viewedByCount
    onymouslyLikedBy (limit: 1) {
      items {
        ...userFragment
      }
      nextToken
    }
  }
  ${mediaObjectFragment}
  ${userFragment}
`

export const albumFragment = `
  fragment albumFragment on Album {
    albumId
    createdAt
    ownedBy {
      ...userFragment
    }
    name
    description
    url
    url4k
    url1080p
    url480p
    url64p
    posts(limit: 10) {
      items {
        ...postFragment
      }
      nextToken
    }
    postCount
    postsLastUpdatedAt
  }
  ${postFragment}
`