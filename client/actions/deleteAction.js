import axios from 'axios';
import { BUSINESS_DELETED, USER_DELETED, REVIEW_DELETED } from './types';

/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Oject} businessId
 *
 * @return {Object} action dispatched by the action creator
 */
const businessDeleted = businessId => ({
  type: BUSINESS_DELETED,
  businessId
});
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Number} userId
 *
 * @return {Object} action dispatched by the action creator
 */
const userDeleted = userId => ({
  type: USER_DELETED,
  userId
});
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Number} reviewId
 *
 * @return {Object} action dispatched by the action creator
 */
const reviewDeleted = reviewId => ({
  type: REVIEW_DELETED,
  reviewId
});
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Number} businessId
 *
 * @param {Number} reviewId
 * @param {Function} fetchBusinessById
 *
 * @return {Object} action dispatched by the action creator
 */
const deleteReview = (businessId, reviewId, fetchBusinessById) => dispatch => axios.delete(`/api/v1/businesses/${businessId}/reviews/${reviewId}`)
  .then(() => {
    dispatch(reviewDeleted(reviewId));
    fetchBusinessById(businessId);
    toastr.success('Review deleted successfully');
  });
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Oject} id
 * @param {String} username
 * @param {Array} history
 *
 * @return {Object} action dispatched by the action creator
 */
const deleteBusiness = (id, username, history) => dispatch => axios.delete(`/api/v1/businesses/${id}`)
  .then(() => {
    dispatch(businessDeleted(id));
    if (username === process.env.ADMIN) {
      toastr.success('Business deleted successfully');
      return history.push('/adminpanel');
    }
    toastr.success('Business deleted successfully');
    return history.push('/dashboard');
  });
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Number} id
 *
 * @return {Object} action dispatched by the action creator
 */
const deleteUser = id => dispatch => axios.delete(`http://localhost:4000/api/v1/admin/users/${id}`).then(() => {
  dispatch(userDeleted(id));
  toastr.success('User removed successfully');
});

export {
  deleteBusiness,
  deleteReview,
  deleteUser
};
