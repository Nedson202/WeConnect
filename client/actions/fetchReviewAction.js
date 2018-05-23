import axios from 'axios';
import { SET_REVIEWS } from './types';

const setReviews = reviews => ({
  type: SET_REVIEWS,
  reviews
});

/**
 * @description function to dispatch an action to filter recipes
 * 
 * @param {Oject} id
 * 
 * @return {Object} action dispatched by the action creator
 */
const fetchReviews = id => dispatch => axios.get(`/api/v1/businesses/${id}/reviews`).then((res) => {
  dispatch(setReviews(res.data.reviews));
}).catch(() => {
  dispatch(setReviews([]));
});

export default fetchReviews;
