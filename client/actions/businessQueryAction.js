import axios from 'axios';
import { FILTERED_BUSINESSES, PAGINATION_RESULT } from './types';

/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Array} searchResult
 *
 * @return {Object} action dispatched by the action creator
 */
const setFilteredBusinesses = searchResult => ({
  type: FILTERED_BUSINESSES,
  searchResult
});

/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Oject} result
 *
 * @return {Object} action dispatched by the action creator
 */
const setPaginationResult = result => ({
  type: PAGINATION_RESULT,
  result
});
/**
 * @description function to dispatch an action to filter businesses
 *
 * @param {string} option
 *
 * @param {string} query
 * @param {Object} page
 * @param {Object} history
 *
 * @return {Object} action dispatched by the action creator
 */
const filterBusiness = (option, query, page, history) => (dispatch) => {
  const searchButton = document.getElementById('search-button');
  searchButton.classList.add('loader');
  return axios.get(`/api/v1/businesses?${option}=${query}&${page}`).then((res) => {
    const { allData } = res.data;
    if (!allData) {
      dispatch(setFilteredBusinesses([]));
      toastr.error('No result found');
      searchButton.classList.remove('loader');
    } else {
      dispatch(setFilteredBusinesses(allData.businesses));
      dispatch(setPaginationResult(allData.paginateResult));
      history.push('/searchresult');
      searchButton.classList.remove('loader');
    }
  });
};

export default filterBusiness;
