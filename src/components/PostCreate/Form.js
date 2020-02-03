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
import AlbumsComponent from 'templates/Albums'
import { Text, Caption, Switch } from 'react-native-paper'
import NextIcon from 'assets/svg/settings/Next'
import Slider from '@react-native-community/slider'
import Layout from 'constants/Layout'
import LifetimeIndicator from 'components/PostCreate/LifetimeIndicator'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  lifetime: Yup.string().nullable(),
  text: Yup.string().nullable(),
})

const getTextByValue = (t) => (lifetime) => {
  if (lifetime === 'P1D') { return t('for a Day') }
  if (lifetime === 'P7D') { return t('for a Week') }
  if (lifetime === 'P1M') { return t('for a Month') }
  if (lifetime === 'P1Y') { return t('for a Year') }
  if (lifetime === null) { return t('Forever') }
}

const getIndexByValue = (lifetime) => {
  if (lifetime === 'P1D') { return 1 }
  if (lifetime === 'P7D') { return 2 }
  if (lifetime === 'P1M') { return 3 }
  if (lifetime === 'P1Y') { return 4 }
  if (lifetime === null) { return 5 }
}

const getValueByIndex = (lifetime) => {
  if (lifetime === 1) { return 'P1D' }
  if (lifetime === 2) { return 'P7D' }
  if (lifetime === 3) { return 'P1M' }
  if (lifetime === 4) { return 'P1Y' }
  if (lifetime === 5) { return null }
}

const PostCreateForm = ({
  theme,
  navigation,
  handleSubmit,
  values,
  loading,
  handlePostPress,
  setFieldValue,
  cameraCapture,
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

      <View style={styling.sliderWrapper}>
        <Slider
          style={styling.slider}
          minimumValue={1}
          step={1}
          maximumValue={5}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.disabled}
          value={getIndexByValue(values.lifetime)}
          onValueChange={(value) => setFieldValue('lifetime', getValueByIndex(value))}
        />
        
        <View style={styling.sliderIndicator}>
          <LifetimeIndicator />
        </View>
        
        <Text>{t('Post will be available {{lifetime}}', { lifetime: getTextByValue(t)(values.lifetime) })}</Text>
        <Caption>{t('All posts become stories when they are 24 hours from expiring')}</Caption>
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
        <AlbumsComponent />
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
  sliderWrapper: {
    borderTopColor: '#33333340',
    borderTopWidth: 1,
    borderBottomColor: '#33333340',
    borderBottomWidth: 1,
    paddingTop: 6,
    paddingBottom: 6,
    marginBottom: 6,
  },
  slider: {
    width: Layout.window.width - 24,
    height: 40,
  },
  sliderIndicator: {
    marginBottom: 24,
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
