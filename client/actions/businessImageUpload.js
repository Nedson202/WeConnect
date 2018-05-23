import axios from 'axios';
import { SET_BUSINESS_BY_ID } from './types';

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

const businessImageUploader = (businessId, image) => dispatch => axios.put(`/api/v1/businesses/${businessId}`, image)
.then((res) => {
    dispatch(setBusinessById(res.data.business));
}); //eslint-disable-line no-unused-vars

export default businessImageUploader;
