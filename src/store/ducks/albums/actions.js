import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/albums/constants'

/**
 * 
 */
export const albumsCreateIdle = createAction(constants.ALBUMS_CREATE_IDLE)
export const albumsCreateRequest = createAction(constants.ALBUMS_CREATE_REQUEST)
export const albumsCreateSuccess = createAction(constants.ALBUMS_CREATE_SUCCESS)
export const albumsCreateFailure = createAction(constants.ALBUMS_CREATE_FAILURE)

/**
 * 
 */
export const albumsEditIdle = createAction(constants.ALBUMS_EDIT_IDLE)
export const albumsEditRequest = createAction(constants.ALBUMS_EDIT_REQUEST)
export const albumsEditSuccess = createAction(constants.ALBUMS_EDIT_SUCCESS)
export const albumsEditFailure = createAction(constants.ALBUMS_EDIT_FAILURE)

/**
 * 
 */
export const albumsDeleteIdle = createAction(constants.ALBUMS_DELETE_IDLE)
export const albumsDeleteRequest = createAction(constants.ALBUMS_DELETE_REQUEST)
export const albumsDeleteSuccess = createAction(constants.ALBUMS_DELETE_SUCCESS)
export const albumsDeleteFailure = createAction(constants.ALBUMS_DELETE_FAILURE)
