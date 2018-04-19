import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return (dispatch) => {
    setAuthToken(false);
    localStorage.removeItem('accessToken');
    dispatch(setCurrentUser({}));
  };
}

export function userLoginRequest(userData) {
  return dispatch => axios.post('http://localhost:4000/api/v1/auth/login', userData).then((res) => {
    const token = res.data.token;
    localStorage.setItem('accessToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  });
}
