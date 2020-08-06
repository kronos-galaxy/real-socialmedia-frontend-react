import React from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import TextIcon from 'assets/svg/types/Text'
import PhotoIcon from 'assets/svg/types/Photo'
import GalleryIcon from 'assets/svg/types/Gallery'
import { Subheading } from 'react-native-paper'
import * as navigationActions from 'navigation/actions'
import color from 'color'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const PostType = ({
  t,
  theme,
  handleLibrarySnap,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <TouchableOpacity style={styling.backdrop} onPress={navigationActions.navigateBack(navigation)} />
    
      <SafeAreaView style={styling.component}>
        <View style={styling.types}>
          <TouchableOpacity style={styling.type} onPress={() => {
            navigation.popToTop()
            navigationActions.navigateCamera(navigation)()
          }}>
            <View style={styling.icon}>
              <PhotoIcon fill={theme.colors.backgroundSecondary} />
            </View>
            <Subheading style={styling.text}>{t('Photo')}</Subheading>
          </TouchableOpacity>
          <TouchableOpacity style={styling.type} onPress={() => {
            navigation.popToTop()
            handleLibrarySnap(true)
          }}>
            <View style={styling.icon}>
              <GalleryIcon fill={theme.colors.backgroundSecondary} />
            </View>
            <Subheading style={styling.text}>{t('Gallery')}</Subheading>
          </TouchableOpacity>
          <TouchableOpacity style={styling.type} onPress={() => {
            navigation.popToTop()
            navigationActions.navigatePostCreate(navigation, { type: 'TEXT_ONLY', })()
          }}>
            <View style={styling.icon}>
              <TextIcon fill={theme.colors.backgroundSecondary} />
            </View>
            <Subheading style={styling.text}>{t('Text')}</Subheading>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styling.close} onPress={() => {
          navigation.popToTop()
          navigationActions.navigateBack(navigation)()
        }}>
          <Subheading style={styling.closeText}>{t('x close')}</Subheading>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
  },
  component: {
    height: 180,
    borderRadius: 24,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  types: {
    zIndex: 2,
    maxWidth: 300,
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: theme.spacing.base * 2,
    paddingBottom: theme.spacing.base,
  },
  type: {
    paddingHorizontal: theme.spacing.base,
  },
  close: {
    zIndex: 2,
    alignSelf: 'center',
    paddingHorizontal: theme.spacing.base * 2,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    color: color(theme.colors.text).fade(.4),
    fontWeight: '500',
    alignSelf: 'center',
    fontSize: 14,
  },
  closeText: {
    color: theme.colors.text,
    fontSize: 14,
  },
})

PostType.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  handleLibrarySnap: PropTypes.any,
}

export default withTranslation()(withTheme(PostType))
