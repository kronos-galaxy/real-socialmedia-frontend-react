import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native'
import path from 'ramda/src/path'
import { Headline, Caption } from 'react-native-paper'
import AccordionComponent from 'templates/Accordion'
import ModalProfileComponent from 'templates/ModalProfile'
import ModalHeaderComponent from 'templates/ModalHeader'
import ModalPreviewComponent from 'templates/ModalPreview'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Album = ({
  theme,
  authUser,
  postsSingleGet,
  postsShare,
  postsShareRequest,
  watermark,
  handleWatermark,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const tagged = (path(['data', 'textTaggedUsers'])(postsSingleGet) || [])
    .find(textTag => textTag.tag === `@${path(['username'])(authUser)}`)

  /**
   * Visibility of repost button, repost button will be visible if:
   * - Post owner has tagged current authenticated user
   */
  const repostButtonVisibility = (
    tagged
  )

  return (
    <View style={styling.root}>
      <View style={styling.header}>
        <ModalHeaderComponent
          onPress={() => {}}
        />
      </View>

      <ScrollView bounces={false}>
        <ModalPreviewComponent
          thumbnailSource={{ uri: 'https://i.imgur.com/q6Y6vaS.jpg' }}
          imageSource={{ uri: 'https://i.imgur.com/q6Y6vaS.jpg' }}
        />

        <View style={styling.content}>
          <ModalProfileComponent
            thumbnailSource={{ uri: 'https://i.imgur.com/q6Y6vaS.jpg' }}
            imageSource={{ uri: 'https://i.imgur.com/q6Y6vaS.jpg' }}
            title="azimgd"
            subtitle="Posted 12 hours ago"
          />
        </View>

        <View style={styling.content}>
          <Headline style={[styling.headline, styling.bottomSpacing]}>{t('Share as')}</Headline>
          <AccordionComponent
            items={[
              {
                text: t('Share on Instagram Post'),
                onPress: () => {},
              },
              {
                text: t('Share on Instagram Story'),
                onPress: () => {},
              },
              {
                text: t('Share on Facebook'),
                onPress: () => {},
              },
            ]}
          />
          <View style={styling.bottomSpacing} />
          <Caption style={[styling.bottomSpacing]}>{t('Prove your post is verified by sharing a link to your REAL profile in it\'s description')}</Caption>
        </View>

        <View style={styling.content}>
          <Headline style={[styling.headline, styling.bottomSpacing]}>{t('Store as')}</Headline>
          <AccordionComponent
            items={[
              {
                text: t('Copy to Photos'),
                onPress: () => {},
              },
              {
                text: t('Repost on REAL'),
                onPress: () => {},
              },
            ]}
          />
          <View style={styling.bottomSpacing} />
          <Caption style={[styling.bottomSpacing]}>{t('Prove your post is verified by sharing a link to your REAL profile in it\'s description')}</Caption>
          <View style={styling.bottomSpacing} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  header: {
    zIndex: 2,
  },
  content: {
    padding: theme.spacing.base,
  },
  headline: {
    fontSize: 20,
    fontWeight: '600',
  },
  bottomSpacing: {
    marginBottom: theme.spacing.base,
  },
})

Album.propTypes = {
  theme: PropTypes.any,
  postsSingleGet: PropTypes.any,
  postsShare: PropTypes.any,
  postsShareRequest: PropTypes.any,
}

export default withTheme(Album)
