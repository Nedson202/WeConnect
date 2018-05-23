import jwt from 'jsonwebtoken';
import axios from 'axios';
import tokenVerifier from '../utils/tokenVerifier';
import { SET_BUSINESSES } from './types';

const setBusinesses = businesses => ({
  type: SET_BUSINESSES,
  businesses
});

/**
 * @description function to dispatch an action to fetch businesses
 * 
 * @param {Oject} id
 * 
 * @return {Object} action dispatched by the action creator
 */
const fetchBusinesses = () => dispatch => axios.get('/api/v1/businesses/')
  .then((res) => {
    dispatch(setBusinesses(res.data.businesses));
  });

  /**
 * @description function to dispatch an action to fetch businesses owned by a user
 * 
 * @param {Oject} id
 * 
 * @return {Object} action dispatched by the action creator
 */
const fetchBusinessesByUserId = () => (dispatch) => {
  if ((localStorage.getItem('accessToken'))) {
    if(!tokenVerifier(localStorage.getItem('accessToken'))) {
      const { userId } = jwt.decode(localStorage.getItem('accessToken'));
      return axios.get(`/api/v1/businesses/user/${userId}`)
        .then((res) => {
          dispatch(setBusinesses(res.data.businesses));
        });
    }
  }
};

export {
  fetchBusinesses,
  fetchBusinessesByUserId
};
