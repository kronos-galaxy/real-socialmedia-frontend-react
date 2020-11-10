/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "testFilterButtons"] }] */
import React from 'react'
import { renderWithProviders, fireEvent, within } from 'tests/utils'
import FilterComponent from 'components/Search/Filter'

const handleFilterChange = jest.fn()
const setup = (props) => renderWithProviders(<FilterComponent handleFilterChange={handleFilterChange} {...props} />)

const testFilterButtons = (holder, expected) => {
  const { getAllByRole } = holder
  const $buttons = getAllByRole('button')

  const testButton = ($button, { name, fn, selected }) => {
    handleFilterChange.mockClear()
    expect(within($button).getByText(name)).toBeTruthy()
    expect($button).toHaveProp('accessibilityState', { selected })
    expect(fn).not.toHaveBeenCalled()

    fireEvent.press($button)

    if (selected) {
      expect(fn).not.toHaveBeenCalled()
    } else {
      expect(fn).toHaveBeenCalled()
    }
  }

  testButton($buttons[0], {
    name: 'All',
    selected: expected.all.isActive,
    fn: handleFilterChange,
  })

  testButton($buttons[1], {
    name: 'Verified',
    selected: expected.verified.isActive,
    fn: handleFilterChange,
  })

  testButton($buttons[2], {
    name: 'Unverified',
    selected: expected.unverified.isActive,
    fn: handleFilterChange,
  })

  testButton($buttons[3], {
    name: 'Viewed',
    selected: expected.viewed.isActive,
    fn: handleFilterChange,
  })

  testButton($buttons[4], {
    name: 'Unviewed',
    selected: expected.unviewed.isActive,
    fn: handleFilterChange,
  })
}

describe('Search filter component', () => {
  afterEach(() => {
    handleFilterChange.mockClear()
  })

  it('All', () => {
    const holder = setup({
      trendingFilters: {
        viewedStatus: undefined,
        isVerified: undefined,
      },
    })

    testFilterButtons(holder, {
      all: { isActive: true },
      verified: { isActive: false },
      unverified: { isActive: false },
      viewed: { isActive: false },
      unviewed: { isActive: false },
    })
  })

  it('Verified', () => {
    const holder = setup({
      trendingFilters: {
        viewedStatus: undefined,
        isVerified: true,
      },
    })

    testFilterButtons(holder, {
      all: { isActive: false },
      verified: { isActive: true },
      unverified: { isActive: false },
      viewed: { isActive: false },
      unviewed: { isActive: false },
    })
  })

  it('Unverified', () => {
    const holder = setup({
      trendingFilters: {
        viewedStatus: undefined,
        isVerified: false,
      },
    })

    testFilterButtons(holder, {
      all: { isActive: false },
      verified: { isActive: false },
      unverified: { isActive: true },
      viewed: { isActive: false },
      unviewed: { isActive: false },
    })
  })

  it('Viewed', () => {
    const holder = setup({
      trendingFilters: {
        viewedStatus: 'VIEWED',
        isVerified: undefined,
      },
    })

    testFilterButtons(holder, {
      all: { isActive: false },
      verified: { isActive: false },
      unverified: { isActive: false },
      viewed: { isActive: true },
      unviewed: { isActive: false },
    })
  })

  it('Unviewed', () => {
    const holder = setup({
      trendingFilters: {
        viewedStatus: 'NOT_VIEWED',
        isVerified: undefined,
      },
    })

    testFilterButtons(holder, {
      all: { isActive: false },
      verified: { isActive: false },
      unverified: { isActive: false },
      viewed: { isActive: false },
      unviewed: { isActive: true },
    })
  })
})
