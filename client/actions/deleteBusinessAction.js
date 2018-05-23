import axios from 'axios';
import { BUSINESS_DELETED } from './types';

/**
 * @description function to dispatch an action to filter recipes
 * 
 * @param {Oject} businessId
 * 
 * @return {Object} action dispatched by the action creator
 */
const businessDeleted = businessId => ({
  type: BUSINESS_DELETED,
  businessId
});

/**
 * @description function to dispatch an action to filter recipes
 * 
 * @param {Oject} id
 * 
 * @return {Object} action dispatched by the action creator
 */
const deleteBusiness = id => dispatch => axios.delete(`/api/v1/businesses/${id}`)
  .then(() => {
    dispatch(businessDeleted(id));
  });

export default deleteBusiness;
