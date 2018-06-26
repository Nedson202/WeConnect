import jwt from 'jsonwebtoken';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { SET_CURRENT_USER } from './types';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

const userSignupRequest = userData => dispatch => axios.post('/api/v1/auth/signup', userData).then((res) => {
  const { token } = res.data;
  localStorage.setItem('accessToken', token);
  setAuthToken(token);
  dispatch(setCurrentUser(jwt.decode(token)));
});

export default userSignupRequest;
