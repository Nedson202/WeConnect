import axios from 'axios';
import { REVIEW_DELETED } from './types';

const reviewDeleted = reviewId => ({
  type: REVIEW_DELETED,
  reviewId
});

/**
 * @description function to dispatch an action to filter recipes
 * 
 * @param {Oject} businessId
 * 
 * @param {Object} reviewId
 * 
 * @return {Object} action dispatched by the action creator
 */
const deleteReview = (businessId, reviewId) => dispatch => axios.delete(`/api/v1/businesses/${businessId}/reviews/${reviewId}`)
  .then(() => {
    dispatch(reviewDeleted(reviewId));
  });

export default deleteReview;
