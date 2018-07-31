import axios from 'axios';
import { ADD_REVIEW, SET_CURRENT_USER, EDIT_REVIEW } from './types';
import tokenVerifier from '../utils/tokenVerifier';
import setAuthToken from '../utils/setAuthToken';
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Object} user
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
 * @param {Object} review
 *
 * @return {Object} action dispatched by the action creator
 */
const setReview = review => ({
  type: ADD_REVIEW,
  review
});
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Object} review
 *
 * @return {Object} action dispatched by the action creator
 */
const updateReview = review => ({
  type: EDIT_REVIEW,
  review
});
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Object} businessId
 * @param {Object} message
 * @param {Function} fetchBusinessById
 *
 * @return {Object} action dispatched by the action creator
 */
const reviewRequest = (businessId, message, fetchBusinessById) => (dispatch) => {
  if (tokenVerifier(localStorage.getItem('accessToken'))) {
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    toastr.error('Sorry, you need to login');
    window.location.replace('/login');
  }

  return axios.post(`/api/v1/businesses/${businessId}/reviews`, message).then((res) => {
    dispatch(setReview(res.data.review));
    toastr.success('Review added successfully');
    fetchBusinessById(businessId);
  })
    .catch((error) => {
      if (error.response) {
        const { data } = error.response;
        data.map(err => toastr.error(err));
      }
    });
};
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Number} businessId
 * @param {Number} reviewId
 * @param {Object} message
 * @param {func} fetchBusinessById
 *
 * @return {Object} action dispatched by the action creator
 */
const reviewUpdateRequest = (businessId, reviewId, message, fetchBusinessById) => (dispatch) => {
  if (tokenVerifier(localStorage.getItem('accessToken'))) {
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    toastr.error('Sorry, you need to login');
    window.location.replace('/login');
  }

  return axios.put(`/api/v1/businesses/${businessId}/reviews/${reviewId}`, message).then((res) => {
    dispatch(updateReview(res.data.updateReview));
    fetchBusinessById(businessId);
    toastr.success('Review edited successfully');
  })
    .catch((error) => {
      if (error.response) {
        error.response.data.map(err => toastr.error(err));
      }
    });
};

export {
  reviewRequest,
  reviewUpdateRequest
};
