import * as postsGetTrendingPostsSaga from 'store/ducks/posts/saga/postsGetTrendingPosts'
import * as queries from 'store/ducks/posts/queries'
import * as actions from 'store/ducks/posts/actions'
import { testSaga } from 'redux-saga-test-plan'
import * as queryService from 'services/Query'
import * as selectors from 'store/ducks/posts/selectors'

jest.spyOn(queryService, 'apiRequest')

const errorWrapper = (err) => err.message

describe('postsGetTrendingPostsSaga', () => {
  const action = actions.postsGetTrendingPostsRequest({ limit: 100 })
  const data = { data: { trendingPosts: { items: [], nextToken: null } } }
  const next = { data: data.data.trendingPosts.items, payload: action.payload, meta: {} }

  it('successfully fetch trending posts', () => {
    testSaga(postsGetTrendingPostsSaga.postsGetTrendingPostsRequest, action)
      .next()
      .getContext('errorWrapper')

      .next(errorWrapper)
      .call(postsGetTrendingPostsSaga.handlePostsGetTrendingPostsRequest, action.payload)

      .next(data)
      .call(postsGetTrendingPostsSaga.postsGetTrendingPostsRequestData, action, data)

      .next(next)
      .put(actions.postsGetTrendingPostsSuccess(next))

      .next()
      .isDone()
  })

  it('catch an error', () => {
    const message = 'Error Message'

    testSaga(postsGetTrendingPostsSaga.postsGetTrendingPostsRequest, action)
      .next()
      .getContext('errorWrapper')

      .next(errorWrapper)
      .throw(new Error(message))
      .put(actions.postsGetTrendingPostsFailure({ message, payload: action.payload }))

      .next()
      .isDone()
  })
})

describe('handlePostsGetTrendingPostsRequest saga', () => {
  const filters = { isVerified: true, viewedStatus: 'VIEWED' }

  afterEach(() => {
    queryService.apiRequest.mockClear()
  })

  it('handlePostsGetTrendingPostsRequest makes single request when enough posts returned', () => {
    const saga = testSaga(postsGetTrendingPostsSaga.handlePostsGetTrendingPostsRequest, {})
    const data = { data: { trendingPosts: { items: new Array(60), nextToken: null } } }

    saga
      .next()
      .select(selectors.postsGetTrendingPostsFilters)

      .next(filters)
      .call(queryService.apiRequest, queries.trendingPosts, filters)

      .next(data)
      .isDone()
  })

  it('handlePostsGetTrendingPostsRequest makes single request when not enough posts returned but next page is not available', () => {
    const saga = testSaga(postsGetTrendingPostsSaga.handlePostsGetTrendingPostsRequest, {})
    const data = { data: { trendingPosts: { items: new Array(30), nextToken: null } } }

    saga
      .next()
      .select(selectors.postsGetTrendingPostsFilters)

      .next(filters)
      .call(queryService.apiRequest, queries.trendingPosts, filters)

      .next(data)
      .isDone()
  })

  it('handlePostsGetTrendingPostsRequest makes multiple requests when not enough posts returned and next page is available', () => {
    const saga = testSaga(postsGetTrendingPostsSaga.handlePostsGetTrendingPostsRequest, {})
    const data = { data: { trendingPosts: { items: new Array(30), nextToken: '1' } } }

    saga
      .next()
      .select(selectors.postsGetTrendingPostsFilters)

      .next(filters)
      .call(queryService.apiRequest, queries.trendingPosts, filters)

      .next(data)
      .call(
        postsGetTrendingPostsSaga.handlePostsGetTrendingPostsRequest,
        { nextToken: data.data.trendingPosts.nextToken },
        [...data.data.trendingPosts.items],
      )
      .next()
      .isDone()
  })
})
