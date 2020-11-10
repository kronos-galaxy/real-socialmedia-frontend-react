import React from 'react'
import DatingAboutScreen from 'screens/DatingAboutScreen'
import { renderWithStore, fireEvent } from 'tests/utils'
import { testField } from 'tests/utils/helpers'
import * as RNPermissions from 'react-native-permissions'
import * as authSelector from 'store/ducks/auth/selectors'

const user = {
  userId: 'id123',
  gender: 'FEMALE',
  fullName: 'fullName',
  dateOfBirth: '1990-04-21',
}

const setup = () => renderWithStore(<DatingAboutScreen />)

jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn(), useFocusEffect: jest.fn() }))

jest.spyOn(RNPermissions, 'request').mockResolvedValue(true)
jest.spyOn(RNPermissions, 'check').mockResolvedValue(RNPermissions.RESULTS.GRANTED)
jest.spyOn(authSelector, 'authUserSelector').mockReturnValue(user)

describe('DatingAboutScreen', () => {
  const openAllSections = (queryByAccessibilityLabel) => {
    fireEvent.press(queryByAccessibilityLabel('Toggle Gender'))
    fireEvent.press(queryByAccessibilityLabel('Toggle Full Name'))
    fireEvent.press(queryByAccessibilityLabel('Toggle Bio'))
  }

  it('toggle collapsed sections', () => {
    const { queryByAccessibilityLabel } = setup()

    expect(queryByAccessibilityLabel('DateOfBirthMonth')).toBeTruthy()
    fireEvent.press(queryByAccessibilityLabel('Toggle Your Date of Birth'))
    expect(queryByAccessibilityLabel('DateOfBirthMonth')).toBeFalsy()

    expect(queryByAccessibilityLabel('gender')).toBeFalsy()
    fireEvent.press(queryByAccessibilityLabel('Toggle Gender'))
    expect(queryByAccessibilityLabel('gender')).toBeTruthy()

    expect(queryByAccessibilityLabel('fullName')).toBeFalsy()
    fireEvent.press(queryByAccessibilityLabel('Toggle Full Name'))
    expect(queryByAccessibilityLabel('fullName')).toBeTruthy()

    expect(queryByAccessibilityLabel('bio')).toBeFalsy()
    fireEvent.press(queryByAccessibilityLabel('Toggle Bio'))
    expect(queryByAccessibilityLabel('bio')).toBeTruthy()
  })

  it('default values', () => {
    authSelector.authUserSelector.mockReturnValue({})
    const { getByAccessibilityLabel } = setup()

    openAllSections(getByAccessibilityLabel)

    testField(getByAccessibilityLabel('DateOfBirthMonth'), { value: 'January' })
    testField(getByAccessibilityLabel('dateOfBirthDay'), { value: '01' })
    testField(getByAccessibilityLabel('dateOfBirthYear'), { value: '2000' })
    testField(getByAccessibilityLabel('gender'), { value: 'Your Gender' })
    testField(getByAccessibilityLabel('fullName'), { value: undefined })

    authSelector.authUserSelector.mockReturnValue(user)
  })

  it('values from profile', () => {
    const { getByAccessibilityLabel } = setup()

    openAllSections(getByAccessibilityLabel)

    testField(getByAccessibilityLabel('DateOfBirthMonth'), { value: 'April' })
    testField(getByAccessibilityLabel('dateOfBirthDay'), { value: '21' })
    testField(getByAccessibilityLabel('dateOfBirthYear'), { value: '1990' })
    testField(getByAccessibilityLabel('gender'), { value: 'Female' })
    testField(getByAccessibilityLabel('fullName'), { value: user.fullName })
    testField(getByAccessibilityLabel('bio'), { value: user.bio })
  })
})
