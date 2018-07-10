import jwt from 'jsonwebtoken';
import axios from 'axios';
import {
  SET_BUSINESSES,
  SET_BUSINESSES_BY_ID,
  PAGINATION_RESULT,
  SET_BUSINESS_BY_ID,
  SET_LOCATIONS,
  SET_CATEGORIES,
  SET_REVIEWS,
  SET_USERS
}
  from './types';
import loadingState from './loader';
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Array} businesses
 *
 * @return {Object} action dispatched by the action creator
 */
const setBusinesses = businesses => ({
  type: SET_BUSINESSES,
  businesses
});
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Array} businesses
 *
 * @return {Object} action dispatched by the action creator
 */
const setBusinessesOwnedByUser = businesses => ({
  type: SET_BUSINESSES_BY_ID,
  businesses
});
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
 * @param {Oject} result
 *
 * @return {Object} action dispatched by the action creator
 */
const setPaginationResult = result => ({
  type: PAGINATION_RESULT,
  result
});
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Array} locations
 *
 * @return {Object} action dispatched by the action creator
 */
const setLocations = locations => ({
  type: SET_LOCATIONS,
  locations
});
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Array} categories
 *
 * @return {Object} action dispatched by the action creator
 */
const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
});
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Array} reviews
 *
 * @return {Object} action dispatched by the action creator
 */
const setReviews = reviews => ({
  type: SET_REVIEWS,
  reviews
});
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Array} users
 *
 * @return {Object} action dispatched by the action creator
 */
const setUsers = users => ({
  type: SET_USERS,
  users
});
/**
 * @description function to dispatch an action to fetch businesses
 *
 * @param {any} query
 *
 * @return {Object} action dispatched by the action creator
 */
const fetchBusinesses = query => (dispatch) => {
  dispatch(loadingState(true));
  return axios.get(`/api/v1/businesses/?${query}`)
    .then((res) => {
      dispatch(loadingState(false));
      const { allData } = res.data;
      if (!allData) {
        dispatch(setBusinesses([]));
      } else {
        dispatch(setBusinesses(allData.businesses));
        dispatch(setPaginationResult(allData.paginateResult));
      }
    });
};

/**
 * @description function to dispatch an action to fetch businesses owned by a user
 *
 * @param {any} query
 *
 * @return {Object} action dispatched by the action creator
 */
const fetchBusinessesByUserId = query => (dispatch) => {
  dispatch(loadingState(true));
  if ((localStorage.getItem('accessToken'))) {
    const { userId } = jwt.decode(localStorage.getItem('accessToken'));
    return axios.get(`/api/v1/businesses/user/${userId}?${query}`)
      .then((res) => {
        dispatch(loadingState(false));
        const { allData } = res.data;
        if (!allData) {
          dispatch(setBusinessesOwnedByUser([]));
        } else {
          dispatch(setBusinessesOwnedByUser(allData.businesses));
          dispatch(setPaginationResult(allData.paginateResult));
        }
      });
  }
  dispatch(loadingState(false));
};

/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Number} businessId
 *
 * @return {Object} action dispatched by the action creator
 */
const fetchBusinessById = businessId => dispatch => axios.get(`/api/v1/businesses/${businessId}`)
  .then((res) => {
    dispatch(setBusinessById(res.data.business));
    dispatch(loadingState(false));
  }).catch(() => dispatch(loadingState(false)));


/**
 * @description function to dispatch an action to fetch locations from db
 *
 * @return {Object} action dispatched by the action creator
 */
const fetchLocations = () => dispatch => axios.get('/api/v1/locations')
  .then((res) => {
    dispatch(setLocations(res.data.locations));
  });

  /**
 * @description function to dispatch an action to fetch business categories from db
 * @return {Object} action dispatched by the action creator
 */
const fetchCategories = () => dispatch => axios.get('/api/v1/categories')
  .then((res) => {
    dispatch(setCategories(res.data.categories));
  });
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {any} id
 *
 * @param {any} query
 *
 * @return {Object} action dispatched by the action creator
 */
const fetchReviews = (id, query) => dispatch => axios.get(`/api/v1/businesses/${id}/reviews?${query}`).then((res) => {
  const { allData } = res.data;
  if (!allData) {
    dispatch(setReviews([]));
  } else {
    dispatch(setReviews(allData.reviews));
    dispatch(setPaginationResult(allData.paginatedReviewResult));
  }
});

/**
 * @description function to dispatch an action to filter recipes
 *
 * @return {Object} action dispatched by the action creator
 */
const fetchUsers = () => dispatch => axios.get('/api/v1/admin/users').then((res) => {
  const { userArray } = res.data;
  dispatch(setUsers(userArray));
});

export {
  fetchBusinesses,
  fetchBusinessesByUserId,
  fetchBusinessById,
  fetchLocations,
  fetchCategories,
  fetchReviews,
  fetchUsers
};
