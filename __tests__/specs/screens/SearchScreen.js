/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "testFilter"] }] */
import React from 'react'
import { useDispatch } from 'react-redux'
import { renderWithProviders, fireEvent } from 'tests/utils'
import * as postsSelector from 'store/ducks/posts/selectors'
import * as usersActions from 'store/ducks/users/actions'
import * as postsActions from 'store/ducks/posts/actions'
import SearchScreen from 'screens/SearchScreen'
 
jest.mock('react-redux', () => ({ useDispatch: jest.fn(), useSelector: (i) => i }))
jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn(), useScrollToTop: jest.fn() }))
jest.mock('store/ducks/posts/selectors', () => ({ postsGetTrendingPostsSelector: jest.fn() }))

const setup = (props) => renderWithProviders(<SearchScreen {...props} />)

describe('Search screen', () => {
  const dispatch = jest.fn()

  beforeAll(() => {
    postsSelector.postsGetTrendingPostsSelector.mockReturnValue({ data: [], filters: {} })
    useDispatch.mockReturnValue(dispatch)
  })

  afterEach(() => {
    dispatch.mockClear()
  })

  it('initial fetch', () => {
    setup()

    expect(dispatch).toHaveBeenCalledWith(usersActions.usersGetTrendingUsersRequest({ limit: 30 }))
  })

  describe('Filters', () => {
    const testFilter = ({ name, filters }) => {
      const holder = setup()
      dispatch.mockClear()

      fireEvent.press(holder.getByText(name))
      expect(dispatch).toHaveBeenCalledWith(postsActions.postsGetTrendingPostsChangeFilters(filters))
    }

    it('toggle Verified/Unverified', () => {
      testFilter({ name: 'Verified', filters: { isVerified: true, viewedStatus: undefined } })
      testFilter({ name: 'Unverified', filters: { isVerified: false, viewedStatus: undefined } })
    })

    it('toggle Viewed/Unviewed', () => {
      testFilter({ name: 'Viewed', filters: { isVerified: undefined, viewedStatus: 'VIEWED' } })
      testFilter({ name: 'Unviewed', filters: { isVerified: undefined, viewedStatus: 'NOT_VIEWED' } })
    })
  })
})
