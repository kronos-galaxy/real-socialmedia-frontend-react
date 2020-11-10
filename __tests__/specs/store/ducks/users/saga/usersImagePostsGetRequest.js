import { expectSaga } from 'redux-saga-test-plan'
import { getContext } from 'redux-saga/effects'
import usersImagePostsGetRequest from 'store/ducks/users/saga/usersImagePostsGetRequest'
import * as usersActions from 'store/ducks/users/actions'
import * as queryService from 'services/Query'
import * as queries from 'store/ducks/users/queries'
import { errorWrapper } from 'store/helpers'

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))

const payload = { userId: 1 }
const action = usersActions.usersImagePostsGetRequest(payload)

describe('usersImagePostsGetRequest', () => {
  afterEach(() => {
    queryService.apiRequest.mockClear()
  })

  it('success', async () => {
    const response = { data: { user: { posts: { items: [{ postId: 1 }, { postId: 2 }] } } } }

    queryService.apiRequest.mockResolvedValueOnce(response)

    await expectSaga(usersImagePostsGetRequest, action)
      .provide([[getContext('errorWrapper'), errorWrapper]])

      .put(usersActions.usersImagePostsGetSuccess({ data: [1, 2] }))

      .silentRun()

    expect(queryService.apiRequest).toHaveBeenCalledWith(queries.getImagePosts, payload)
  })

  it('catch an error', async () => {
    const error = new Error('Fetch Error')

    queryService.apiRequest.mockRejectedValueOnce(error)

    await expectSaga(usersImagePostsGetRequest, action)
      .provide([[getContext('errorWrapper'), errorWrapper]])

      .put(usersActions.usersImagePostsGetFailure({ message: error.message }))

      .silentRun()
  })
})
