import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
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
import dayjs from 'dayjs'
import Slider from '@react-native-community/slider'
import Layout from 'constants/Layout'
import LifetimeIndicator from 'components/PostCreate/LifetimeIndicator'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  text: Yup.string().nullable(),
})

const getInitialLifetime = (expiresAt) => {
  if (!expiresAt) {
    return null
  }

  if (dayjs(expiresAt).isBefore(dayjs().add(1, 'day'))) {
    return 'P1D'
  } else if (dayjs(expiresAt).isBefore(dayjs().add(7, 'day'))) {
    return 'P7D'
  } else if (dayjs(expiresAt).isBefore(dayjs().add(1, 'month'))) {
    return 'P1M'
  } else if (dayjs(expiresAt).isBefore(dayjs().add(1, 'year'))) {
    return 'P1Y'
  }
}

const getTextByValue = (t) => (lifetime) => {
  if (lifetime === 'P1D') { return t('for a Day') }
  if (lifetime === 'P7D') { return t('for a Week') }
  if (lifetime === 'P1M') { return t('for a Month') }
  if (lifetime === 'P1Y') { return t('for a Year') }
  if (lifetime === null) { return t('Forever') }
  return t('Forever')
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
  return null
}

const getArgumentsByIndex = (lifetime) => {
  if (lifetime === 1) { return [1, 'day'] }
  if (lifetime === 2) { return [7, 'day'] }
  if (lifetime === 3) { return [1, 'month'] }
  if (lifetime === 4) { return [1, 'year'] }
  if (lifetime === 5) { return null }
}

const PostEditForm = ({
  theme,
  navigation,
  handleSubmit,
  values,
  loading,
  setFieldValue,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={styling.header}>
        <View style={styling.avatar}>
          <Avatar
            size="bigger"
            thumbnailSource={{ uri: values.uri }}
            imageSource={{ uri: values.uri }}
          />
        </View>

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
          onValueChange={(value) => {
            setFieldValue('lifetime', getValueByIndex(value))
            const expiryArguments = getArgumentsByIndex(value)

            if (expiryArguments) {
              setFieldValue('expiresAt', dayjs().add(...getArgumentsByIndex(value) || null).toJSON())
            } else {
              setFieldValue('expiresAt', null)
            }
          }}
        />
        
        <View style={styling.sliderIndicator}>
          <LifetimeIndicator />
        </View>
        
        <Text>{t('Post availability')}</Text>
        <Caption>
          {values.expiresAt ?
            t('This post will expire {{expiresAt}}', { expiresAt: dayjs(values.expiresAt).from(dayjs()) }) :
            t('This post will be available forever')}
        </Caption>
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
          label: t('Share'),
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
        <DefaultButton label={t('Edit Post')} onPress={handleSubmit} loading={loading} />
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
  avatar: {
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

PostEditForm.propTypes = {
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  postEdit: PropTypes.any,
}

export default withTheme(({
  postsEdit,
  postsEditRequest,
  postsSingleGet,
  ...props
}) => (
  <Formik
    initialValues={{
      postId: postsSingleGet.data.postId,
      uri: path(['mediaObjects', '0', 'url1080p'])(postsSingleGet.data),
      text: postsSingleGet.data.text,
      expiresAt: postsSingleGet.data.expiresAt,
      commentsDisabled: postsSingleGet.data.commentsDisabled,
      likesDisabled: postsSingleGet.data.likesDisabled,
      sharingDisabled: postsSingleGet.data.sharingDisabled,
      lifetime: getInitialLifetime(postsSingleGet.data.expiresAt),
    }}
    validationSchema={formSchema}
    onSubmit={postsEditRequest}
    enableReinitialize
  >
    {(formikProps) => (
      <PostEditForm
        {...formikProps}
        {...props}
        loading={postsEdit.status === 'loading'}
      />
    )}
  </Formik>
))
