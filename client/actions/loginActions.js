import jwt from 'jsonwebtoken';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { SET_CURRENT_USER } from './types';

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user
  }
};

const logout = () => (dispatch) => {
  setAuthToken(false);
  localStorage.removeItem('accessToken');
  dispatch(setCurrentUser({}));
};

const userLoginRequest = userData => dispatch => axios.post('/api/v1/auth/login', userData).then((res) => {
  const { token } = res.data;
  localStorage.setItem('accessToken', token);
  setAuthToken(token);
  dispatch(setCurrentUser(jwt.decode(token)));
});

export {
  logout,
  userLoginRequest
};
