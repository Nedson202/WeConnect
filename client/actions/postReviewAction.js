import axios from 'axios';
import { ADD_REVIEW } from './types';

export function setReview(review) {
  return {
    type: ADD_REVIEW,
    review
  };
}

export function reviewRequest(businessId, message) {
  return dispatch => axios.post(`http://localhost:4000/api/v1/businesses/${businessId}/reviews`, message).then((res) => {
    dispatch(setReview(res.data.review));
  });
}
