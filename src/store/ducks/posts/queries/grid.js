export const gridPostFragment = `
  fragment imageFragment on Image {
    url
    url64p
    url480p
    url1080p
    url4k
    width
    height
    colors {
      r
      g
      b
    }
  }

  fragment postUserFragment on User {
    userId
    username
    viewCountsHidden
    commentsDisabled
    likesDisabled
    sharingDisabled
    verificationHidden
    fullName
    themeCode
    bio
    blockedStatus
    blockerStatus

    photo {
      ...imageFragment
    }
  }

  fragment gridPostFragment on Post {
    postId
    postStatus
    postType
    postedAt
    expiresAt
    text
    likesDisabled
    commentsDisabled
    sharingDisabled
    commentsUnviewedCount: commentsCount(viewedStatus: NOT_VIEWED)

    image {
      ...imageFragment
    }

    postedBy {
      ...postUserFragment
    }
  }
`
