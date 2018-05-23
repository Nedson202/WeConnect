import axios from 'axios';
import { ADD_REVIEW } from './types';

const setReview = review => ({
  type: ADD_REVIEW,
  review
});

const reviewRequest = (businessId, message) => dispatch => axios.post(`/api/v1/businesses/${businessId}/reviews`, message).then((res) => {
    dispatch(setReview(res.data.review));
  });

export default reviewRequest;