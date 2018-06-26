import axios from 'axios';
import { SET_LOCATIONS, SET_CATEGORIES } from './types';

const setLocations = locations => ({
  type: SET_LOCATIONS,
  locations
});

const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
});

/**
 * @description function to dispatch an action to fetch locations from db
 * 
 * @param {Oject} id
 * 
 * @return {Object} action dispatched by the action creator
 */
const fetchLocations = () => dispatch => axios.get('/api/v1/locations')
  .then((res) => {
    dispatch(setLocations(res.data.locations));
  });

  /**
 * @description function to dispatch an action to fetch business categories from db
 * 
 * @param {Oject} id
 * 
 * @return {Object} action dispatched by the action creator
 */
const fetchCategories = () => (dispatch) => axios.get('/api/v1/categories')
  .then((res) => {
    dispatch(setCategories(res.data.categories));
  });

export {
  fetchLocations,
  fetchCategories
};
