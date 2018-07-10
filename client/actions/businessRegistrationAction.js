import axios from 'axios';
import tokenVerifier from '../utils/tokenVerifier';
import setAuthToken from '../utils/setAuthToken';
import { SET_CURRENT_USER, ADD_BUSINESS } from './types';
import loadingState from './loader';
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Oject} user
 *
 * @return {Object} action dispatched by the action creator
 */
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Oject} business
 *
 * @return {Object} action dispatched by the action creator
 */
export const addBusiness = business => ({
  type: ADD_BUSINESS,
  business
});
/**
 * @description function to register a business
 *
 * @param {Oject} businessData
 * @param {Oject} history
 *
 * @return {Object} action dispatched by the action creator
 */
const businessRegistrationRequest = (businessData, history) => (dispatch) => {
  dispatch(loadingState(true));
  if (!tokenVerifier(localStorage.getItem('accessToken'))) {
    return axios.post('/api/v1/businesses', businessData)
      .then((res) => {
        const { business, message } = res.data;
        dispatch(loadingState(false));
        dispatch(addBusiness(business));
        toastr.success(message);
        return history.push('/dashboard');
      }).catch((error) => {
        dispatch(loadingState(false));
        error.response.data.map(err => toastr.error(err));
      });
  }

  setAuthToken(false);
  dispatch(setCurrentUser({}));
  window.location.replace('/login');
};
/**
 * @description function to update business
 *
 * @param {Oject} id
 *
 * @param {Object} businessData
 * @param {Object} history
 *
 * @return {Object} action dispatched by the action creator
 */
const businessUpdateRequest = (id, businessData, history) => (dispatch) => {
  dispatch(loadingState(true));
  return axios.put(`/api/v1/businesses/${id}`, businessData)
    .then((res) => {
      const { message } = res.data;
      dispatch(loadingState(false));
      toastr.success(message);
      return history.push(`/profile/${id}`);
    }).catch((error) => {
      dispatch(loadingState(false));
      error.response.data.map(err => toastr.error(err));
    });
};

export {
  businessRegistrationRequest,
  businessUpdateRequest
};
