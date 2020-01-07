import path from 'ramda/src/path'

const AccessControlList = {
  themes: {
    selection: ['basic'],
  },
  posts: {
    watermarkRemove: ['diamond'],
  },
  users: {
    paymentHelper: ['basic'],
  },
}

export const hasAccessToResource = (resourcePath, membership) => {
  const resource = path(resourcePath)(AccessControlList)
  return resource.includes(membership)
}