import { ADD_FLASH_MESSAGE } from './types';
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Object} message
 *
 * @return {Object} action dispatched by the action creator
 */
const addFlashMessage = message => ({
  type: ADD_FLASH_MESSAGE,
  message
});

export default addFlashMessage;
