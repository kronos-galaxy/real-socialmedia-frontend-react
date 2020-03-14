import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import Svg, { G, Path } from 'react-native-svg'
import { useSelector } from 'react-redux'
import * as themeSelector from 'store/ducks/theme/selectors'
import ImageComponent from 'templates/Image'

import { withTheme } from 'react-native-paper'

const Icon = () => (
  <Svg height={9} width={9} viewBox="0 0 12 12">
    <G fill="#ffffff">
      <Path d="M11,5H7V1A1,1,0,0,0,5,1V5H1A1,1,0,0,0,1,7H5v4a1,1,0,0,0,2,0V7h4a1,1,0,0,0,0-2Z" fill="#ffffff"/>
    </G>
  </Svg>
)

const AvatarTemplate = ({
  t,
  theme,
  thumbnailSource,
  imageSource,
  active,
  size,
  icon,
  themeCode,
}) => {
  /**
   * User theme color around story of that user. For example if I (ian) follow mike, and Mike has the green theme set,
   * I (ian) should see a green outline around mikes story (if he has one) at the top of my news feed.
   */
  const customTheme = useSelector(themeSelector.userThemeSelector(themeCode || 'black.green'))
  const activeTheme = (themeCode && active) ? customTheme : theme

  const styling = styles(activeTheme)

  const componentStyle = [
    size === 'micro' ? styling.sizeMicro : null,
    size === 'small' ? styling.sizeSmall : null,
    size === 'default' ? styling.sizeDefault : null,
    size === 'medium' ? styling.sizeMedium : null,
    size === 'bigger' ? styling.sizeBigger : null,
    size === 'large' ? styling.sizeLarge : null,
  ]

  const photoStyle = [
    size !== 'micro' && active ? styling.photoActive : null,
    size !== 'micro' && !active ? styling.photoInactive : null,
  ]

  return (
    <View style={styling.root}>
      <View style={componentStyle}>
        <View style={photoStyle}>
          <ImageComponent
            thumbnailSource={thumbnailSource}
            imageSource={imageSource}
            style={styling.photo}
            resizeMode="cover"
            hideProgress
          />
        </View>

        {icon ?
          <View style={styling.iconWrapper}>
            <View style={styling.icon}>
              <Icon />
            </View>
          </View>
        : null}
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeMicro: {
    width: 18,
    height: 18,
  },
  sizeSmall: {
    width: 32,
    height: 32,
  },
  sizeDefault: {
    width: 44,
    height: 44,
  },
  sizeMedium: {
    width: 68,
    height: 68,
  },
  sizeBigger: {
    width: 90,
    height: 90,
  },
  sizeLarge: {
    width: 120,
    height: 120,
  },
  photoActive: {
    borderWidth: 2,
    borderColor: theme.colors.navigation,
    borderRadius: 4,
    padding: 2,
  },
  photoInactive: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 4,
    padding: 2,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
  },
  iconWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: -6,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
  },
  icon: {
    backgroundColor: theme.colors.button,
    width: 18,
    height: 18,
    borderRadius: 9,
    padding: 4.5,
  },
})

AvatarTemplate.defaultProps = {
  children: () => {},
  size: 'default',
}

AvatarTemplate.propTypes = {
  theme: PropTypes.any,
  uri: PropTypes.any,
  active: PropTypes.any,
  size: PropTypes.any,
  icon: PropTypes.any,
  themeCode: PropTypes.any,
}

export default withTheme(AvatarTemplate)
