import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'
import PhoneInput from 'react-native-phone-input'
import TextField from 'components/Formik/TextField'
import FlagComponent from 'components/Formik/PhoneField/Flag'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const PhoneField = ({
  t,
  theme,
  ...props
}) => {
  const styling = styles(theme)

  const inputRef = useRef(null)
  
  /**
   * Manually updating country when new country code selected
   */
  const onSelectCountry = (country) => {
    const nextValue = `+${inputRef.current.getCountryCode(country)}`
    props.form.setFieldValue('countryCode', nextValue)
  }

  return (
    <View style={styling.root}>
      {inputRef.current ?
        <FlagComponent inputRef={inputRef} />
      : null}

      <PhoneInput
        ref={inputRef}
        flagStyle={styling.flag}
        textProps={props}
        onChangePhoneNumber={props.field.onChange}
        value={props.field.value}
        textComponent={TextField}
        onSelectCountry={onSelectCountry}
        style={styling.input}
      />
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
  flag: {
    display: 'none',
  },
})

PhoneField.propTypes = {
  theme: PropTypes.any,
  field: PropTypes.any,
}

export default withTranslation()(withTheme(PhoneField))
