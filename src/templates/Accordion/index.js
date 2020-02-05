import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Accordion = ({
  theme,
  items,
}) => {
  const styling = styles(theme)
  const list = items.filter(item => !item.disabled)

  return (
    <View style={styling.accordion}>
      {list.map((item, key) => {
        const style = (key + 1 !== list.length) ?
          [styling.accordionItem, styling.accordionItemDivider] :
          [styling.accordionItem]

        return (        
          <View style={style} key={key}>
            <TouchableOpacity onPress={item.onPress}>
              <Text style={styling.text}>{item.text}</Text>
            </TouchableOpacity>

            {item.loading ?
              <ActivityIndicator size={8} style={styling.icon} />
            : null}
          </View>
        )
      })}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  text: {
    fontSize: 16,
  },
  accordion: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 4,
  },
  accordionItem: {
    padding: theme.spacing.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accordionItemDivider: {
    borderBottomColor: `${theme.colors.border}20`,
    borderBottomWidth: 0.5,
  },
  icon: {
    paddingHorizontal: theme.spacing.base,
  },
})

Accordion.propTypes = {
  theme: PropTypes.any,
  items: PropTypes.any,
}

export default withTheme(Accordion)
