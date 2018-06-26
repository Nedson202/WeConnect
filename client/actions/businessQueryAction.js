import axios from 'axios';
import { FILTERED_BUSINESSES } from './types';

const setFilteredBusinesses = searchResult => {
  return {
    type: FILTERED_BUSINESSES,
    searchResult
  }
}
/**
 * @description function to dispatch an action to filter businesses
 * 
 * @param {Oject} option
 * 
 * @param {Object} query
 * 
 * @return {Object} action dispatched by the action creator
 */
const filterBusiness = (option, query) => (dispatch) => 
  axios.get(`/api/v1/businesses?${option}=${query}`).then((res) => {
    dispatch(setFilteredBusinesses(res.data.businesses));
  });


export default filterBusiness;
