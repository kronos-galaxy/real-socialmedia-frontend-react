import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import pickAll from 'ramda/src/pickAll'
import { withTheme } from 'react-native-paper'

const Filter = ({
  theme,
  trendingFilters,
  handleFilterChange,
  isLoading,
}) => {
  const styling = styles(theme)
  const { viewedStatus, isVerified } = pickAll(['viewedStatus', 'isVerified'], trendingFilters)

  const handlePostsAllFilter = () => {
    handleFilterChange({ viewedStatus: undefined, isVerified: undefined })
  }
  const handlePostsViewedFilter = () => {
    handleFilterChange({ ...trendingFilters, viewedStatus: 'VIEWED' })
  }
  const handlePostsNotViewedFilter = () => {
    handleFilterChange({ ...trendingFilters, viewedStatus: 'NOT_VIEWED' })
  }
  const handlePostsVerifiedFilter = () => {
    handleFilterChange({ ...trendingFilters, isVerified: true })
  }
  const handlePostsNotVerifiedFilter = () => {
    handleFilterChange({ ...trendingFilters, isVerified: false })
  }

  const filters = [
    { title: 'All', isActive: viewedStatus === undefined && isVerified === undefined, onPress: handlePostsAllFilter },
    { title: 'Verified', isActive: isVerified === true, onPress: handlePostsVerifiedFilter },
    { title: 'Unverified', isActive: isVerified === false, onPress: handlePostsNotVerifiedFilter },
    { title: 'Viewed', isActive: viewedStatus === 'VIEWED', onPress: handlePostsViewedFilter },
    { title: 'Unviewed', isActive: viewedStatus === 'NOT_VIEWED', onPress: handlePostsNotViewedFilter },
  ]

  const makeStyles = ({ isActive, isLoading }) => ([
    ...[styling.filter],
    ...(isActive ? [styling.filterSelected] : []),
    ...(isLoading ? [styling.filterDisabled] : []),
  ])

  return (
    <View style={styling.root}>
      <ScrollView style={styling.filters} horizontal>
        {filters.map((filter) => (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ selected: filter.isActive }}
            key={filter.title}
            style={makeStyles({ isActive: filter.isActive, isLoading })}
            onPress={filter.onPress}
            disabled={filter.isActive || isLoading}
          >
            <Text style={styling.text}>{filter.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {},
    filters: {
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    filter: {
      borderRadius: 4,
      marginRight: theme.spacing.base,
      marginBottom: 6,
      padding: 6,
    },
    filterCreate: {
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
    filterSelected: {
      backgroundColor: theme.colors.primary,
    },
    text: {
      fontWeight: '500',
    },
    filterDisabled: {
      opacity: 0.4,
    },
  })

Filter.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  trendingFilters: PropTypes.shape({
    viewedStatus: PropTypes.oneOf(['VIEWED', 'NOT_VIEWED']),
    isVerified: PropTypes.bool,
  }),
  handleFilterChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
}

Filter.defaultProps = {
  values: {},
  isLoading: false,
  trendingFilters: {},
}

export default withTheme(Filter)
