import * as LinkingService from 'services/Linking'

const baseUrl = 'https:/real.app'
const userId = 'us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce'
const postId = '1bb30c92-ff1d-4d38-98b7-73942557dfbd'

describe('deeplinkPath determines provided post params', () => {
  it('Chats', () => {
    const chatsUrl = `${baseUrl}/chat/`
    expect(LinkingService.deeplinkPath(chatsUrl)).toMatchObject({
      action: 'chats',
    })
  })

  it('Root post without action', () => {
    const rootUrl = `${baseUrl}/user/${userId}/post/${postId}`
    expect(LinkingService.deeplinkPath(rootUrl)).toMatchObject({ _: baseUrl, userId, postId })

    const rootUrlSlashed = `${rootUrl}/`
    expect(LinkingService.deeplinkPath(rootUrlSlashed)).toMatchObject({ _: baseUrl, userId, postId })
  })

  it('Invite Friends', () => {
    const inviteFriendsUrl = `${baseUrl}/user/${userId}/settings/contacts`
    expect(LinkingService.deeplinkPath(inviteFriendsUrl)).toMatchObject({ _: baseUrl, userId })

    const inviteFriendsUrlSlashed = `${inviteFriendsUrl}/`
    expect(LinkingService.deeplinkPath(inviteFriendsUrlSlashed)).toMatchObject({ _: baseUrl, userId })
  })

  it('Views action path', () => {
    const viewsUrl = `${baseUrl}/user/${userId}/post/${postId}/views`
    expect(LinkingService.deeplinkPath(viewsUrl)).toMatchObject({ _: baseUrl, userId, postId, action: 'views' })
  })

  it('Likes action path', () => {
    const likesUrl = `${baseUrl}/user/${userId}/post/${postId}/likes`
    expect(LinkingService.deeplinkPath(likesUrl)).toMatchObject({ _: baseUrl, userId, postId, action: 'likes' })
  })

  it('Comments action path', () => {
    const commentsUrl = `${baseUrl}/user/${userId}/post/${postId}/comments`
    expect(LinkingService.deeplinkPath(commentsUrl)).toMatchObject({ _: baseUrl, userId, postId, action: 'comments' })

    const commentsUrlSlashed = `${baseUrl}/user/${userId}/post/${postId}/comments/`
    expect(LinkingService.deeplinkPath(commentsUrlSlashed)).toMatchObject({
      _: baseUrl,
      userId,
      postId,
      action: 'comments',
    })

    const commentsUrlAction = `${baseUrl}/user/${userId}/post/${postId}/comments/3fb30c92-ffgg-4d53-98b7-73957dfs425`
    expect(LinkingService.deeplinkPath(commentsUrlAction)).toMatchObject({
      _: baseUrl,
      userId,
      postId,
      action: 'comments',
      actionId: '3fb30c92-ffgg-4d53-98b7-73957dfs425',
    })
  })

  it('Failing url', () => {
    const appUrl = baseUrl
    expect(() => LinkingService.deeplinkPath(appUrl)).toThrow(/The in-app card is not supported/)

    const missingUserUrl = `${baseUrl}/user/${userId}`
    expect(() => LinkingService.deeplinkPath(missingUserUrl)).toThrow(/The in-app card is not supported/)
  })

  it('Sign up', () => {
    const signupUrl = `${baseUrl}/signup/${userId}`
    expect(LinkingService.deeplinkPath(signupUrl)).toEqual({ _: baseUrl, action: 'signup', userId })
  })
})

describe('deeplinkNavigation redirect routes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const navigation = {
    navigate: jest.fn().mockName('mockedNavigate'),
    push: jest.fn().mockName('mockedPush'),
  }
  const actions = {
    navigateChat: jest.fn().mockName('mockedNavigateChat'),
    navigateNestedComments: jest.fn().mockName('mockedNavigateNestedComments'),
    navigateNestedPostViews: jest.fn().mockName('mockedNavigateNestedPostViews'),
    navigateNestedPostLikes: jest.fn().mockName('mockedNavigateNestedPostLikes'),
    navigateNestedPost: jest.fn().mockName('mockedNavigateNestedPost'),
    navigateProfilePhoto: jest.fn().mockName('mockedNavigateProfilePhoto'),
    navigateInviteFriends: jest.fn().mockName('mockedNavigateInviteFriends'),
    navigateAuthUsername: jest.fn().mockName('navigateAuthUsername'),
  }
  const Linking = {
    openURL: jest.fn().mockName('mockedOpenUrl'),
  }

  it('chats', () => {
    const rootUrl = `${baseUrl}/chat/`
    LinkingService.deeplinkNavigation(navigation, actions, Linking)(rootUrl)
    expect(actions.navigateChat).toHaveBeenLastCalledWith(navigation)
  })

  it('post', () => {
    const rootUrl = `${baseUrl}/user/${userId}/post/${postId}`
    LinkingService.deeplinkNavigation(navigation, actions, Linking)(rootUrl)
    expect(actions.navigateNestedPost).toHaveBeenLastCalledWith(navigation, {
      _: baseUrl,
      userId,
      postId,
      action: 'post',
    })
  })

  it('comments', () => {
    const rootUrl = `${baseUrl}/user/${userId}/post/${postId}/comments`
    LinkingService.deeplinkNavigation(navigation, actions, Linking)(rootUrl)
    expect(actions.navigateNestedComments).toHaveBeenLastCalledWith(navigation, {
      _: baseUrl,
      userId,
      postId,
      action: 'comments',
    })
  })

  it('comments with commentId', () => {
    const rootUrl = `${baseUrl}/user/${userId}/post/${postId}/comments/3fb30c92-ffgg-4d53-98b7-73957dfs425`
    LinkingService.deeplinkNavigation(navigation, actions, Linking)(rootUrl)
    expect(actions.navigateNestedComments).toHaveBeenLastCalledWith(navigation, {
      _: baseUrl,
      userId,
      postId,
      action: 'comments',
      actionId: '3fb30c92-ffgg-4d53-98b7-73957dfs425',
    })
  })

  it('likes', () => {
    const rootUrl = `${baseUrl}/user/${userId}/post/${postId}/likes`
    LinkingService.deeplinkNavigation(navigation, actions, Linking)(rootUrl)
    expect(actions.navigateNestedPostLikes).toHaveBeenLastCalledWith(navigation, {
      _: baseUrl,
      userId,
      postId,
      action: 'likes',
    })
  })

  it('views', () => {
    const rootUrl = `${baseUrl}/user/${userId}/post/${postId}/views`
    LinkingService.deeplinkNavigation(navigation, actions, Linking)(rootUrl)
    expect(actions.navigateNestedPostViews).toHaveBeenLastCalledWith(navigation, {
      _: baseUrl,
      userId,
      postId,
      action: 'views',
    })
  })

  it('profile photo', () => {
    const rootUrl = `${baseUrl}/user/${userId}/settings/photo`
    LinkingService.deeplinkNavigation(navigation, actions, Linking)(rootUrl)
    expect(actions.navigateProfilePhoto).toHaveBeenLastCalledWith(navigation, {
      _: baseUrl,
      userId,
      action: 'profilePhoto',
    })
  })

  it('invite friends', () => {
    const rootUrl = `${baseUrl}/user/${userId}/settings/contacts`
    LinkingService.deeplinkNavigation(navigation, actions, Linking)(rootUrl)
    expect(actions.navigateInviteFriends).toHaveBeenLastCalledWith(navigation, {
      _: baseUrl,
      userId,
      action: 'inviteFriends',
    })
  })

  it('sign up', () => {
    const rootUrl = `${baseUrl}/signup/${userId}`
    LinkingService.deeplinkNavigation(navigation, actions, Linking)(rootUrl)
    expect(actions.navigateAuthUsername).toHaveBeenLastCalledWith(navigation, { _: baseUrl, userId, action: 'signup' })
  })

  it('open url', () => {
    const rootUrl = 'https:/google.com'
    LinkingService.deeplinkNavigation(navigation, actions, Linking)(rootUrl)
    expect(Linking.openURL).toHaveBeenLastCalledWith(rootUrl)
  })
})
