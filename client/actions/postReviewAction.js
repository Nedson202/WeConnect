import axios from 'axios';
import { ADD_REVIEW, SET_CURRENT_USER } from './types';
import tokenVerifier from '../utils/tokenVerifier';
import setAuthToken from '../utils/setAuthToken';

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user
  }
};

const setReview = review => ({
  type: ADD_REVIEW,
  review
});

const reviewRequest = (businessId, message) => dispatch => {
  if(!tokenVerifier(localStorage.getItem('accessToken'))) {
    return axios.post(`/api/v1/businesses/${businessId}/reviews`, message).then((res) => {
      dispatch(setReview(res.data.review));
    });
  }

  setAuthToken(false);
  dispatch(setCurrentUser({}));
  location.replace('/login')
}

export default reviewRequest;
