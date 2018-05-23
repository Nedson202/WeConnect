import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';
import { SET_CURRENT_USER } from './types';

export const setCurrentUser = (user) => {
    return {
      type: SET_CURRENT_USER,
      user
    }
  };

const userProfileUpdate = (userId, data) => dispatch => axios.put(`/api/v1/user/${userId}`, data)
    .then((res) => {
        const { token } = res.data;
        localStorage.setItem('accessToken', token);
        setAuthToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));    
    }); //eslint-disable-line no-unused-vars

export default userProfileUpdate;
