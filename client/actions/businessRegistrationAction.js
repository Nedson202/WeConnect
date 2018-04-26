import axios from 'axios';

export function businessRegistrationRequest(businessData) {
  return dispatch => axios.post('http://localhost:4000/api/v1/businesses', businessData);
}
