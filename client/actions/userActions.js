import jwt from 'jsonwebtoken';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { SET_CURRENT_USER } from './types';
import loadingState from './loader';
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Object} user
 *
 * @return {Object} action dispatched by the action creator
 */
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});
/**
 * @description function to dispatch an action to filter recipes
 *
 * @return {any} action dispatched by the action creator
 */
const logout = () => (dispatch) => {
  setAuthToken(false);
  localStorage.removeItem('accessToken');
  localStorage.removeItem('image');
  dispatch(setCurrentUser({}));
};
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Object} userData
 * @param {Object} history
 *
 * @return {Object} action dispatched by the action creator
 */
const userLoginRequest = (userData, history) => (dispatch) => {
  dispatch(loadingState(true));
  return axios.post('/api/v1/auth/login', userData)
    .then((res) => {
      const { token, message, image } = res.data;
      const payload = jwt.decode(token);
      localStorage.setItem('accessToken', token);
      localStorage.setItem('image', image);
      setAuthToken(token);
      dispatch(setCurrentUser(payload));
      dispatch(loadingState(false));
      toastr.success(message);
      if (payload.username === process.env.ADMIN) {
        history.push('/adminpanel');
      } else {
        history.push('/dashboard');
      }
    }).catch((error) => {
      error.response.data.map(err => toastr.error(err));
      dispatch(loadingState(false));
    });
};

/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Object} userData
 * @param {Object} history
 *
 * @return {Object} action dispatched by the action creator
 */
const userSignupRequest = (userData, history) => (dispatch) => {
  dispatch(loadingState(true));
  return axios.post('/api/v1/auth/signup', userData)
    .then((res) => {
      const { token, message } = res.data;
      localStorage.setItem('accessToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      dispatch(loadingState(false));
      toastr.success(message);
      history.push('/dashboard');
    }).catch((error) => {
      const { data } = error.response;
      data.map(err => toastr.error(err));
      dispatch(loadingState(false));
    });
};

/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Number} userId
 * @param {Object} data
 *
 * @return {Object} action dispatched by the action creator
 */
const userProfileUpdateRequest = (userId, data) => dispatch => axios.put(`/api/v1/user/${userId}`, data)
  .then((res) => {
    const { token } = res.data;
    localStorage.setItem('accessToken', token);
    localStorage.setItem('image', data.image);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
    toastr.success('Profile update successful');
    document.getElementById('closeProfileModal').click();
  }).catch((error) => {
    if (error) {
      error.response.data.map(err => toastr.error(err));
    }
  }); // eslint-disable-line no-unused-vars

export {
  logout,
  userLoginRequest,
  userSignupRequest,
  userProfileUpdateRequest
};
