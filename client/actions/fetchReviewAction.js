import axios from 'axios';
import { SET_REVIEWS } from './types';

export function setReviews(reviews) {
  return {
    type: SET_REVIEWS,
    reviews
  };
}

export function fetchReviews(id) {
  return (dispatch) => {
    return axios.get(`http://localhost:4000/api/v1/businesses/${id}/reviews`).then(res => {
      dispatch(setReviews(res.data.reviews))
    }).catch(error => {
      dispatch(setReviews([]))
    });
  };
}
