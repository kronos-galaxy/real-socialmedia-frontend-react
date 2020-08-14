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

import { withTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  name: Yup.string().min(1).max(50).required(),
})

const AlbumCreateForm = ({
  t,
  handleSubmit,
  loading,
}) => {
  const styling = styles

  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field name="name" component={TextField} placeholder={t('Album Name')} />
      </View>

      <View style={styling.input}>
        <DefaultButton label={t('Create Album')} onPress={handleSubmit} loading={loading} disabled={loading} />
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

AlbumCreateForm.propTypes = {
  t: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
}

export default withTranslation()(({
  albumsCreateRequest,
  ...props
}) => (
  <Formik
    initialValues={{
      name: '',
      description: '',
    }}
    validationSchema={formSchema}
    onSubmit={albumsCreateRequest}
  >
    {(formikProps) => (
      <AlbumCreateForm
        {...formikProps}
        {...props}
        loading={false}
      />
    )}
  </Formik>
))