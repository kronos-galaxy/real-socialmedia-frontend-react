import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import {
  Button,
  Title,
  Text,
} from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Modal = ({
  theme,
  navigation,
  ...props
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  
  const cancelAction = props.cancelAction || navigation.getParam('cancelAction')
  const cancelLabel = props.cancelLabel || navigation.getParam('cancelLabel')
  const confirmLabel = props.confirmLabel || navigation.getParam('confirmLabel')
  const confirmAction = props.confirmAction || navigation.getParam('confirmAction')
  const title = props.title || navigation.getParam('title')
  const text = props.text || navigation.getParam('text')

  return (
    <View style={styling.root}>
      <View style={styling.modal}>
        <View style={styling.text}>
          <Title>{title}</Title>
        </View>

        <View style={styling.text}>
          <Text>{text}</Text>
        </View>

        <View style={styling.action}>
          <Button mode="contained" onPress={confirmAction}>
            {confirmLabel}
          </Button>
        </View>

        <View style={styling.action}>
          <Button mode="text" onPress={cancelAction}>
            {cancelLabel}
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: theme.colors.backgroundPrimary,
    width: '90%',
    padding: theme.spacing.base,
  },
  text: {
    marginBottom: 24,
  },
  action: {
    marginBottom: theme.spacing.base,
  },
})

Modal.propTypes = {
  theme: PropTypes.any,
  navigation: PropTypes.any,
}

export default withNavigation(
  withTheme(Modal)
)
