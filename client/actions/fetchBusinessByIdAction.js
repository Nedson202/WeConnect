import axios from 'axios';
import { SET_BUSINESS_BY_ID } from './types';
import loader from './loader';

/**
 * @description function to dispatch an action to filter recipes
 * 
 * @param {Oject} business
 * 
 * @return {Object} action dispatched by the action creator
 */
const setBusinessById = business => ({
  type: SET_BUSINESS_BY_ID,
  business
});

/**
 * @description function to dispatch an action to filter recipes
 * 
 * @param {Oject} businessId
 * 
 * @return {Object} action dispatched by the action creator
 */
const fetchBusinessById = businessId => dispatch => axios.get(`/api/v1/businesses/${businessId}`)
  .then((res) => {
    dispatch(setBusinessById(res.data.business));
    dispatch(loader());
  });

export default fetchBusinessById;
