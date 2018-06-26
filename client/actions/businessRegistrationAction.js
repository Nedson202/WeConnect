import axios from 'axios';
import tokenVerifier from '../utils/tokenVerifier';
import setAuthToken from '../utils/setAuthToken';
import { SET_CURRENT_USER } from './types';

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user
  }
};
/**
 * @description function to register a business
 *
 * @param {Oject} businessData
 *
 * @return {Object} action dispatched by the action creator
 */
const businessRegistrationRequest = businessData => dispatch => {
    if(!tokenVerifier(localStorage.getItem('accessToken'))) {
      return axios.post(`/api/v1/businesses`, businessData)
    }

    setAuthToken(false);
    dispatch(setCurrentUser({}));
    location.replace('/login')
}

export default businessRegistrationRequest;
