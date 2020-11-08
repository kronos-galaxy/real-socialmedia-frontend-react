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

const formSchema = Yup.object().shape({
  confirmationCode: Validation.confirmationCode,
})

const PhoneConfirmForm = ({
  t,
  handleSubmit,
  loading,
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.input}>
        <Field name="confirmationCode" component={TextField} placeholder={t('Confirmation Code')} keyboardType="number-pad" textContentType="oneTimeCode" autoCompleteType="off" autoFocus maxLength={6} />
      </View>

      <View style={styles.input}>
        <DefaultButton label={t('Next')} onPress={handleSubmit} loading={loading} disabled={loading} />
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

PhoneConfirmForm.propTypes = {
  t: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
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
      <PhoneConfirmForm
        {...formikProps}
        {...props}
        loading={formSubmitLoading}
        disabled={formSubmitDisabled}
      />
    )}
  </Formik>
))
