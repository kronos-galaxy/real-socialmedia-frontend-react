import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import PhoneField from 'components/Formik/PhoneField'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import * as Validation from 'services/Validation'

import { withTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  phone: Validation.phone,
})

const ForgotForm = ({
  t,
  handleSubmit,
  loading,
  disabled,
  isValid,
  isValidating,
}) => {
  const submitDisabled = (
    disabled ||
    !isValid ||
    isValidating
  )

  return (
    <View style={styles.root}>
      <View style={styles.input}>
        <Field name="phone" component={PhoneField} placeholder={t('Phone Number')} keyboardType="phone-pad" textContentType="telephoneNumber" autoCompleteType="tel" autoFocus />
      </View>
      <View style={styles.input}>
        <DefaultButton label={t('Next')} onPress={handleSubmit} loading={loading} disabled={submitDisabled} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
  },
  input: {
    marginBottom: 12,
  },
})

ForgotForm.propTypes = {
  t: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
  disabled: PropTypes.any,
  isValid: PropTypes.any,
  isValidating: PropTypes.any,
}

export default withTranslation()(({
  handleFormSubmit,
  formSubmitLoading,
  formSubmitDisabled,
  formInitialValues,
  ...props
}) => (
  <Formik
    initialValues={formInitialValues}
    validationSchema={formSchema}
    onSubmit={handleFormSubmit}
    enableReinitialize
  >
    {(formikProps) => (
      <ForgotForm
        {...formikProps}
        {...props}
        loading={formSubmitLoading}
        disabled={formSubmitDisabled}
      />
    )}
  </Formik>
))
