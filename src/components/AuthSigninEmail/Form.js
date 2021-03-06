import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import TextField from 'components/Formik/TextField'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import * as Validation from 'services/Validation'

import { withTranslation } from 'react-i18next'
import testIDs from './test-ids'

const formSchema = Yup.object().shape({
  email: Validation.email,
  password: Validation.password,
})

const SigninForm = ({
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
        <Field testID={testIDs.form.email} name="email" component={TextField} placeholder={t('Email')} keyboardType="default" textContentType="email" autoCompleteType="email" />
      </View>
      <View style={styles.input}>
        <Field testID={testIDs.form.password} name="password" component={TextField} placeholder={t('Password')} secureTextEntry keyboardType="default" textContentType="password" autoCompleteType="password" />
      </View>
      <View style={styles.input}>
        <DefaultButton testID={testIDs.form.submitBtn} label={t('Next')} onPress={handleSubmit} loading={loading} disabled={submitDisabled} />
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

SigninForm.propTypes = {
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
      <SigninForm
        {...formikProps}
        {...props}
        loading={formSubmitLoading}
        disabled={formSubmitDisabled}
      />
    )}
  </Formik>
))
