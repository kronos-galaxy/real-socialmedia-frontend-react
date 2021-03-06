import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import path from 'ramda/src/path'
import GridComponent from 'templates/Grid'
import GridItemComponent from 'templates/GridItem'
import CacheComponent from 'components/Cache'
import CheckedIcon from 'assets/svg/other/Checked'
import UncheckedIcon from 'assets/svg/other/Unchecked'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { Subheading, withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const ProfilePhotoGrid = ({
  t,
  theme,
  usersImagePostsGet,
  handlePostPress,
  selectedPost,
  handleOpenVerification,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <View style={styling.bookmark}>
        <Subheading style={styling.subtitle}>{t('Only Verified Posts Can Be Set as a Profile Picture')}</Subheading>
        <DefaultButton label={t('How to pass verification?')} onPress={handleOpenVerification} mode="outlined" />
      </View>
      <ScrollView>
        <GridComponent items={path(['data'])(usersImagePostsGet)}>
          {(post, priorityIndex) => (
            <GridItemComponent
              onPress={() => handlePostPress(post)}
              active={selectedPost.postId === post.postId}
              activeIcon={<CheckedIcon fill={theme.colors.iconPrimary} />}
              inactiveIcon={<UncheckedIcon fill={theme.colors.iconPrimary} />}
            >
              <CacheComponent
                thread="default"
                images={[
                  [path(['image', 'url64p'])(post), true],
                  [path(['image', 'url480p'])(post), true],
                ]}
                fallback={path(['image', 'url480p'])(post)}
                priorityIndex={priorityIndex}
                resizeMode="cover"
              />
            </GridItemComponent>
          )}
        </GridComponent>
      </ScrollView>
    </View>
  )
}
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    flexWrap: 'wrap',
  },
  info: {
    padding: theme.spacing.base,
    alignItems: 'center',
  },
  bookmark: {
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.base,
    paddingBottom: theme.spacing.base * 2,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing.base,
  },
})

ProfilePhotoGrid.defaultProps = {
  usersImagePostsGet: {},
}

ProfilePhotoGrid.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  usersImagePostsGet: PropTypes.any,
  handlePostPress: PropTypes.any,
  selectedPost: PropTypes.any,
  handleOpenVerification: PropTypes.func,
}

export default withTranslation()(withTheme(ProfilePhotoGrid))
