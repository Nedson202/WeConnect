import axios from 'axios';
import { SET_BUSINESS_BY_ID } from './types';

export function setBusinessById(business) {
  return {
    type: SET_BUSINESS_BY_ID,
    business
  };
}

export function fetchBusinessById(businessId) {
  return (dispatch) => axios.get(`http://localhost:4000/api/v1/businesses/${businessId}`)
  .then(res => {
    dispatch(setBusinessById(res.data.business))
  });
}
