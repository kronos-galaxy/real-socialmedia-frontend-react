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
  username: Validation.phoneOrEmail,
  password: Validation.password,
  confirmationCode: Validation.confirmationCode,
})

const ForgotConfirmForm = ({
  t,
  handleSubmit,
  loading,
  disabled,
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.input}>
        <Field
          testID={testIDs.form.username}
          name="username"
          component={TextField}
          placeholder={t('Phone or Email')}
          {...Validation.getInputTypeProps('username')}
        />
      </View>
      <View style={styles.input}>
        <Field
          testID={testIDs.form.confirmationCode}
          name="confirmationCode"
          component={TextField}
          placeholder={t('Confirmation Code')}
          {...Validation.getInputTypeProps('confirmationCode')}
        />
      </View>
      <View style={styles.input}>
        <Field
          testID={testIDs.form.password}
          name="password"
          component={TextField}
          placeholder={t('New Password')}
          {...Validation.getInputTypeProps('password')}
        />
      </View>
      <View style={styles.input}>
        <DefaultButton
          testID={testIDs.form.submitBtn}
          label={t('Next')}
          onPress={handleSubmit}
          loading={loading}
          disabled={disabled}
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

ForgotConfirmForm.propTypes = {
  t: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
  disabled: PropTypes.bool,
}

ForgotConfirmForm.defaultProps = {
  disabled: false,
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
      <ForgotConfirmForm
        {...formikProps}
        {...props}
        loading={formSubmitLoading}
        disabled={formSubmitDisabled}
      />
    )}
  </Formik>
))
