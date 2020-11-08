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
import testIDs from 'components/AuthEmail/test-ids'

const formSchema = Yup.object().shape({
  email: Validation.email,
})

const EmailForm = ({
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
        <Field
          testID={testIDs.form.email}
          name="email"
          placeholder="Email"
          component={TextField}
          {...Validation.getInputTypeProps('email')}
        />
      </View>
      <View style={styles.input}>
        <DefaultButton
          testID={testIDs.form.submitBtn}
          label={t('Next')}
          onPress={handleSubmit}
          loading={loading}
          disabled={submitDisabled}
        />
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

EmailForm.propTypes = {
  t: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
  disabled: PropTypes.bool, 
  isValid: PropTypes.bool,
  isValidating: PropTypes.bool,
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
      <EmailForm
        {...formikProps}
        {...props}
        loading={formSubmitLoading}
        disabled={formSubmitDisabled}
      />
    )}
  </Formik>
))
