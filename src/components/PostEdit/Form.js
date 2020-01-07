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
import { Text } from 'react-native-paper'
import dayjs from 'dayjs'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  text: Yup.string().nullable(),
})

const PostEditForm = ({
  theme,
  navigation,
  handleSubmit,
  values,
  loading,
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

      <View style={styling.input}>
        <RowsComponent items={[{
          label: (
            values.expiresAt ?
            t('Post will expire {{expiresAt}}', { expiresAt: dayjs(values.expiresAt).from(dayjs()) }) :
            t('Post will be available forever')
          ),
        }, {
          label: t('Comments are disabled'),
        }, {
          label: t('Likes are enabled'),
        }]}>
          {(settings) => (
            <RowsItemComponent hasBorders>
              <UserRowComponent
                onPress={path(['onPress'])(settings)}
                content={
                  <View style={styling.user}>
                    <Text style={styling.username}>{path(['label'])(settings)}</Text>
                  </View>
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
