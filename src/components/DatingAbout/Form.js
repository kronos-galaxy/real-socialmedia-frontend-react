import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import TextField from 'components/Formik/TextField'
import PickerField from 'components/Formik/PickerField'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import CollapsableComponent from 'templates/Collapsable'
import { Formik, Field } from 'formik'
import { withTranslation } from 'react-i18next'
import * as Yup from 'yup'

const formSchema = Yup.object().shape({
  dateOfBirthMonth: Yup.string().required('pick month'),
  dateOfBirthDay: Yup.number().required('pick day'),
  dateOfBirthYear: Yup.number().required('pick year'),
  gender: Yup.string().required('pick gender'),
  fullName: Yup.string().required('enter full name'),
  bio: Yup.string().required('enter bio'),
})

const DatingAboutForm = ({
  t,
  handleSubmit,
  loading,
  values,
}) => {
  const styling = styles
    
  const numberToString = (integer) => integer >= 10 ? `${integer}` : `0${integer}`

  /**
   * [dateOfBirth] Generate age range starting from 18
   */
  const dateOfBirthMonthItems = [
    ({ label: 'January', value: '01' }),
    ({ label: 'February', value: '02' }),
    ({ label: 'March', value: '03' }),
    ({ label: 'April', value: '04' }),
    ({ label: 'May', value: '05' }),
    ({ label: 'June', value: '06' }),
    ({ label: 'July', value: '07' }),
    ({ label: 'August', value: '08' }),
    ({ label: 'September', value: '09' }),
    ({ label: 'October', value: '10' }),
    ({ label: 'November', value: '11' }),
    ({ label: 'December', value: '12' }),
  ]
  const dateOfBirthDay = Array.from({ length: 31 }, (_, i) => ({ label: numberToString(i + 1), value: numberToString(i + 1) }))
  const dateOfBirthYear = Array.from({ length: 103 }, (_, i) => ({ label: `${i + 1900}`, value: `${i + 1900}` }))

  /**
   * [gender] User genders
   */
  const genderItems = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
  ]

  return (
    <View style={styling.root}>
      <CollapsableComponent
        style={styling.input}
        title="Your Date of Birth"
        helper="Change your date of birth"
        active={true}
        success={values.dateOfBirthMonth && values.dateOfBirthDay && values.dateOfBirthYear}
      >
        <View style={styling.row}>
          <View style={styling.item}>
            <Field name="dateOfBirthMonth" component={PickerField} placeholder={{ label: 'Month', value: undefined }} items={dateOfBirthMonthItems}  />
          </View>
          <View style={styling.item}>
            <Field name="dateOfBirthDay" component={PickerField} placeholder={{ label: 'Day', value: undefined }} items={dateOfBirthDay}  />
          </View>
          <View style={styling.item}>
            <Field name="dateOfBirthYear" component={PickerField} placeholder={{ label: 'Year', value: undefined }} items={dateOfBirthYear}  />
          </View>
        </View>
      </CollapsableComponent>

      <CollapsableComponent
        style={styling.input}
        title="Your Gender"
        helper="Change your gender"
        active={false}
        success={values.gender}
      >
        <Field name="gender" component={PickerField} placeholder={{ label: 'Your Gender', value: undefined }} items={genderItems} />
      </CollapsableComponent>
      <CollapsableComponent
        style={styling.input}
        title="Your Full Name"
        helper="Change your full name"
        active={false}
        success={values.fullName}
      >
        <Field name="fullName" component={TextField} placeholder={t('Your Full Name')}/>
      </CollapsableComponent>
      <CollapsableComponent
        style={styling.input}
        title="Bio"
        helper="Change your bio"
        active={false}
        success={values.bio}
      >
        <Field name="bio" component={TextField} placeholder={t('Bio')} />
      </CollapsableComponent>
      <View style={styling.input}>
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
  row: {
    flexDirection: 'row',
    marginHorizontal: -12,
  },
  item: {
    flex: 1,
    marginHorizontal: 12,
  },
})

DatingAboutForm.propTypes = {
  t: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
  values: PropTypes.any,
  setFieldValue: PropTypes.any,
}

export default withTranslation()(({
  form,
  ...props
}) => (
  <Formik
    initialValues={form.formInitialValues}
    validationSchema={formSchema}
    onSubmit={form.handleFormSubmit}
    enableReinitialize
  >
    {(formikProps) => (
      <DatingAboutForm
        {...formikProps}
        {...props}
        {...form}
        loading={form.formSubmitLoading}
        disabled={form.formSubmitDisabled}
      />
    )}
  </Formik>
))
