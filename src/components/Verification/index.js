import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
} from 'react-native'
import { Paragraph } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Verification = ({
  theme,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <ScrollView style={styling.root}>
      <Paragraph style={styling.paragraph}>{t('Our mission is to encourage high quality content to ensure REAL grows into an honest & meantally healthy platform for your followers')}.</Paragraph>
      <Paragraph style={styling.paragraph}>{t('This post may be pending verification because of one or more of the following')}:</Paragraph>
      <Paragraph style={styling.paragraph}>* {t('It’s been modified, cropped, or rotated by another app')}.</Paragraph>
      <Paragraph style={styling.paragraph}>* {t('It’s been copied or was taken using another camera')}.</Paragraph>
      <Paragraph style={styling.paragraph}>* {t('It’s too blurry')}.</Paragraph>
      <Paragraph style={styling.paragraph}>* {t('It was taken using iOS portrait mode (selective lighting/filter)')}.</Paragraph>
      <Paragraph style={styling.paragraph}>* {t('It has/uses a filter or has been photoshopped')}.</Paragraph>
      <Paragraph style={styling.paragraph}>* {t('It has poor lighting')}.</Paragraph>
      <Paragraph style={styling.paragraph}>* {t('It’s from the internet (copyrighted)')}.</Paragraph>
      <Paragraph style={styling.paragraph}>* {t('It was previously flagged as inappropriate by > 20% of the viewers who saw it')}.</Paragraph>

      <Paragraph style={styling.paragraph}>{t('If you don’t like “Post Verification”, don’t stress! You can disable Post Verification for good for all posts in settings under “Mental Health & Privacy Settings”. Nobody can detect if you have post verification disabled')}.</Paragraph>
    </ScrollView>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 12,
  },
})

Verification.propTypes = {
  theme: PropTypes.any,
}

export default withTheme(Verification)
