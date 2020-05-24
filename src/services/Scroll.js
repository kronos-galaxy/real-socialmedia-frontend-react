import path from 'ramda/src/path'
import Layout from 'constants/Layout'

/**
 * 
 */
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) =>
  layoutMeasurement.height + contentOffset.y >= contentSize.height - (Layout.window.height * 1.80)

/**
 *
 */
const getLoadMoreCondition = resource => (
  resource.status !== 'loading' &&
  path(['data', 'length'])(resource) &&
  path(['meta', 'nextToken'])(resource) &&
  path(['meta', 'nextToken'])(resource) !== path(['payload', 'nextToken'])(resource)
)

const ScrollHelper = ({
  resource,
  loadInit,
  loadMore,
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
    isCloseToBottom(nativeEvent) && handleLoadMore()
  
  /**
   *
   */
  const handleRefresh = () =>
    loadInit({})

  return {
    handleScrollChange,
    handleRefresh,
  }
}


export default ScrollHelper