import axios from 'axios';

/**
 * @description function to dispatch an action to filter businesses
 * 
 * @param {Oject} option
 * 
 * @param {Object} query
 * 
 * @return {Object} action dispatched by the action creator
 */
const filterBusiness = (option, query) => (dispatch) => 
  axios.get(`/api/v1/businesses?${option}=${query}`).then((res) => {
    const businessList = JSON.stringify(res.data.businesses);
    sessionStorage.setItem('businessList', businessList);
  }).catch(() => {
    sessionStorage.setItem('businessList', null);
    return 'Business not found';
  });


export default filterBusiness;
