import React from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import TextIcon from 'assets/svg/types/Text'
import PhotoIcon from 'assets/svg/types/Photo'
import GalleryIcon from 'assets/svg/types/Gallery'
import { Subheading } from 'react-native-paper'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const PostType = ({
  theme,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <TouchableOpacity style={styling.backdrop} onPress={() => navigation.goBack()} />
    
      <View style={styling.component}>
        <LinearGradient
          colors={['#03a9f4', '#009688']}
          style={styling.gradient}
        />

        <View style={styling.types}>
          <TouchableOpacity style={styling.type} onPress={navigationActions.navigateCamera(navigation)}>
            <View style={styling.icon}>
              <PhotoIcon fill="#333333" />
            </View>
            <Subheading style={styling.text}>{t('Photo')}</Subheading>
          </TouchableOpacity>
          <TouchableOpacity style={styling.type} onPress={navigationActions.navigateCamera(navigation)}>
            <View style={styling.icon}>
              <GalleryIcon fill="#333333" />
            </View>
            <Subheading style={styling.text}>{t('Gallery')}</Subheading>
          </TouchableOpacity>
          <TouchableOpacity style={styling.type} onPress={navigationActions.navigatePostCreate(navigation, { type: 'TEXT_ONLY', })}>
            <View style={styling.icon}>
              <TextIcon fill="#333333" />
            </View>
            <Subheading style={styling.text}>{t('Text')}</Subheading>
          </TouchableOpacity>
        </View>
      </View>
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
    zIndex: 1,
  },
  component: {
    height: 180,
    width: '100%',
    borderRadius: 38,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  types: {
    marginTop: 30,
    flexDirection: 'row',
    zIndex: 2,
    justifyContent: 'space-around',
    alignItems: 'flex-start',     
    maxWidth: 300,
    flex: 1,
  },
  type: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#333333',
    fontWeight: '500',
  },
})

PostType.propTypes = {
  theme: PropTypes.any,
}

export default withTheme(PostType)
