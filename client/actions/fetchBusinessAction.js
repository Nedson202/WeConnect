import jwt from 'jsonwebtoken';
import axios from 'axios';
import { SET_BUSINESSES, SET_BUSINESSES_BY_ID } from './types';

export function setBusinesses(businesses) {
  return {
    type: SET_BUSINESSES,
    businesses
  };
}

export function setBusinessesByUserId(businesses) {
  return {
    type: SET_BUSINESSES_BY_ID,
    businesses
  };
}

export function fetchBusinesses() {
  return (dispatch) => {
    return axios.get('http://localhost:4000/api/v1/businesses/').then(res => {
      dispatch(setBusinesses(res.data.businesses));
    })
  };
}

export function fetchBusinessesByUserId() {
  return (dispatch) => {
    const userId = jwt.decode(localStorage.getItem('accessToken')).userId;
    return axios.get(`/api/v1/businesses/user/${userId}`).then(res => {
      dispatch(setBusinesses(res.data.businesses));
    })
  };
}
