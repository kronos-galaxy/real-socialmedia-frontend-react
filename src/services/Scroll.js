import path from 'ramda/src/path'
import Layout from 'constants/Layout'

/**
 * 
 */
const isCloseToBottom = (multiplier = 1.80) => ({ layoutMeasurement, contentOffset, contentSize }) =>
  layoutMeasurement.height + contentOffset.y >= contentSize.height - (Layout.window.height * multiplier)

/**
 *
 */
const getLoadMoreCondition = resource => (
  resource.status !== 'loading' &&
  path(['data', 'length'])(resource) &&
  path(['meta', 'nextToken'])(resource) &&
  path(['meta', 'nextToken'])(resource) !== path(['payload', 'nextToken'])(resource)
)

/**
 *
 */
const getRefreshingCondition = resource => (
  resource.status === 'loading' &&
  !path(['data', 'length'])(resource)
)

const ScrollHelper = ({
  resource,
  loadInit,
  loadMore,
  multiplier = 1.80,
}) => {
  /**
   *
   */
  const handleLoadMore = () =>
    getLoadMoreCondition(resource) && loadMore({ nextToken: path(['meta', 'nextToken'])(resource) })

  /**
   *
   */
  const handleScrollChange = ({ nativeEvent }) =>
    isCloseToBottom(multiplier)(nativeEvent) && handleLoadMore()
  
  /**
   *
   */
  const handleRefresh = () =>
    loadInit({})

  /**
   *
   */
  const refreshing = () =>
    getRefreshingCondition(resource)

  return {
    handleScrollChange,
    handleRefresh,
    refreshing,
  }
}


export default ScrollHelper