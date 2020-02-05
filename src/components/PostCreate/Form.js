import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import TextDemo from 'components/Formik/TextDemo'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'
import RowsComponent from 'templates/Rows'
import RowsItemComponent from 'templates/RowsItem'
import UserRowComponent from 'templates/UserRow'
import { Text, Caption, Switch } from 'react-native-paper'
import NextIcon from 'assets/svg/settings/Next'
import Layout from 'constants/Layout'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  lifetime: Yup.string().nullable(),
  text: Yup.string().nullable(),
})

const PostCreateForm = ({
  theme,
  navigation,
  handleSubmit,
  values,
  loading,
  handlePostPress,
  setFieldValue,
  cameraCapture,
  formLifetime: FormLifetime,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const uri = path(['data', 'uri'])(cameraCapture) || navigation.getParam('base64')

  return (
    <View style={styling.root}>
      <View style={styling.header}>
        <TouchableOpacity onPress={() => handlePostPress({ mediaObjects: [{ 'url4k': uri }] })}>
          <Avatar
            size="bigger"
            thumbnailSource={{ uri }}
            imageSource={{ uri }}
          />
        </TouchableOpacity>

        <View style={styling.text}>
          <Field name="text" component={TextDemo} placeholder={t('Write a caption')} multiline={true} />
        </View>
      </View>

      <View>
        <FormLifetime
          values={values}
          setFieldValue={setFieldValue}
        />
      </View>

      <View style={styling.input}>
        <RowsComponent items={[{
          label: t('Comments'),
          caption: t('Followers can comment on posts'),
          onPress: () => setFieldValue('commentsDisabled', !values.commentsDisabled),
          type: 'action',
          enabled: !values.commentsDisabled,
        }, {
          label: t('First Like'),
          caption: t('See the first user to like your post'),
          onPress: () => setFieldValue('likesDisabled', !values.likesDisabled),
          type: 'action',
          enabled: !values.likesDisabled,
        }, {
          label: t('Sharing'),
          caption: t('Followers can share posts'),
          onPress: () => setFieldValue('sharingDisabled', !values.sharingDisabled),
          type: 'action',
          enabled: !values.sharingDisabled,
        }]}>
          {(settings) => (
            <RowsItemComponent hasBorders>
              <UserRowComponent
                onPress={path(['onPress'])(settings)}
                content={
                  <View style={styling.user}>
                    <Text style={styling.username}>{path(['label'])(settings)}</Text>
                    <Caption>{path(['caption'])(settings)}</Caption>
                  </View>
                }
                action={
                  path(['type'])(settings) === 'navigation' ? (
                    <NextIcon fill={theme.colors.text} />
                  ) : (
                    <Switch
                      value={path(['enabled'])(settings)}
                      onValueChange={settings.onPress}
                    />
                  )
                }
              />
            </RowsItemComponent>
          )}
        </RowsComponent>
      </View>

      <View style={styling.input}>
        <DefaultButton label={t('Create Post')} onPress={handleSubmit} loading={loading} disabled={!uri} />
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  text: {
    flex: 1,
  },
  input: {
    marginBottom: 12,
  },
})

PostCreateForm.propTypes = {
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  postsCreate: PropTypes.any,
}

const FormWrapper = ({
  postsCreate,
  postsCreateRequest,
  ...props
}) => (
  <Formik
    initialValues={{
      lifetime: null,
      likesDisabled: props.user.likesDisabled || true,
      commentsDisabled: props.user.commentsDisabled || true,
      sharingDisabled: props.user.sharingDisabled || false,
      verificationHidden: props.user.verificationHidden || false,
      text: '',
    }}
    validationSchema={formSchema}
    onSubmit={postsCreateRequest}
    enableReinitialize
  >
    {(formikProps) => (
      <PostCreateForm
        {...formikProps}
        {...props}
      />
    )}
  </Formik>
)

export default withNavigation(
  withTheme(FormWrapper)
)
