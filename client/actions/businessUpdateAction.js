import axios from 'axios';

/**
 * @description function to update business
 * 
 * @param {Oject} id
 * 
 * @param {Object} businessData
 * 
 * @return {Object} action dispatched by the action creator
 */
const businessUpdateRequest = (id, businessData) => dispatch => axios.put(`/api/v1/businesses/${id}`, businessData);//eslint-disable-line no-unused-vars
export default businessUpdateRequest;
