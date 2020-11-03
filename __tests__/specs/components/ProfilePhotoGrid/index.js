import React from 'react'
import { renderWithProviders, fireEvent } from 'tests/utils'
import ProfilePhotoGrid from 'components/ProfilePhotoGrid'

const setup = (props) => renderWithProviders(<ProfilePhotoGrid {...props} />)

describe('ProfilePhotoGrid', () => {
  it('bookmark', () => {
    const handleOpenVerification = jest.fn()
    const { getByText } = setup({ handleOpenVerification })

    expect(getByText('Only Verified Posts Can Be Set as a Profile Picture')).toBeTruthy()

    fireEvent.press(getByText('How to pass verification?'))
    expect(handleOpenVerification).toHaveBeenCalled()
  })
})
