import jwt from 'jsonwebtoken';
import axios from 'axios';
import { SET_BUSINESSES, PAGINATION_RESULT } from './types';
import loader from './loader';

const setBusinesses = businesses => ({
  type: SET_BUSINESSES,
  businesses
});

const setPaginationResult = result => ({
  type: PAGINATION_RESULT,
  result
});

/**
 * @description function to dispatch an action to fetch businesses
 * 
 * @param {any} query
 * 
 * @return {Object} action dispatched by the action creator
 */
const fetchBusinesses = (query) => dispatch => axios.get(`/api/v1/businesses/?${query}`)
  .then((res) => {
    const { allData } = res.data;

    if(!allData) {
      dispatch(loader());
      dispatch(setBusinesses([]));
    } else {
      dispatch(setBusinesses(allData.businesses));
      dispatch(loader());
      dispatch(setPaginationResult(allData.paginateResult));
    }
  });

  /**
 * @description function to dispatch an action to fetch businesses owned by a user
 * 
 * @param {any} query
 * 
 * @return {Object} action dispatched by the action creator
 */
const fetchBusinessesByUserId = (query) => (dispatch) => {
  if ((localStorage.getItem('accessToken'))) {
    const { userId } = jwt.decode(localStorage.getItem('accessToken'));
      return axios.get(`/api/v1/businesses/user/${userId}?${query}`)
        .then((res) => {
          const { allData } = res.data;
          if(!allData) {
            dispatch(loader());
            dispatch(setBusinesses([]));
          } else {
            dispatch(setBusinesses(allData.businesses));
            dispatch(loader());
            dispatch(setPaginationResult(allData.paginateResult));
          }
        });
  }
};

export {
  fetchBusinesses,
  fetchBusinessesByUserId
};
