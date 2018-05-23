import axios from 'axios';

/**
 * @description function to register a business
 * 
 * @param {Oject} businessData
 * 
 * @return {Object} action dispatched by the action creator
 */
const businessRegistrationRequest = businessData => dispatch => {
    return axios.post('http://localhost:4000/api/v1/businesses', businessData);
}

export default businessRegistrationRequest;
