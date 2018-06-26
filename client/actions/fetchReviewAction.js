import axios from 'axios';
import { SET_REVIEWS, PAGINATION_RESULT } from './types';
import loader from './loader';

const setReviews = reviews => ({
  type: SET_REVIEWS,
  reviews
});

const setPaginationResult = result => ({
  type: PAGINATION_RESULT,
  result
});

/**
 * @description function to dispatch an action to filter recipes
 * 
 * @param {any} id
 * 
 * @param {any} query
 * 
 * @return {Object} action dispatched by the action creator
 */
const fetchReviews = (id, query) => dispatch => axios.get(`/api/v1/businesses/${id}/reviews?${query}`).then((res) => {
  const { allData } = res.data;
  if(!allData) {
    dispatch(loader());
    dispatch(setReviews([]));
  } else {
    dispatch(loader());
    dispatch(setReviews(allData.reviews));
    dispatch(setPaginationResult(allData.paginatedReviewResult));
  }
})
// .catch(() => {
//   dispatch(setReviews([]));
// });

export default fetchReviews;
