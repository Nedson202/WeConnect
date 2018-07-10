import { TOGGLELOADER } from './types';
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Boolean} loadingStatus
 *
 * @return {Object} action dispatched by the action creator
 */
const loadingState = loadingStatus => ({
  type: TOGGLELOADER,
  loadingStatus
});
// /**
//  * @description function to dispatch an action to filter recipes
//  *
//  * @param {Boolean} loadingStatus
//  *
//  * @return {Object} action dispatched by the action creator
//  */
// const loader = loadingStatus => (dispatch) => {
//   dispatch(loadingState(loadingStatus));
// };
export default loadingState;
