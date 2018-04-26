import axios from 'axios';

export function filterBusiness(option, query) {
  return dispatch => axios.get(`http://localhost:4000/api/v1/businesses?${option}=${query}`).then((res) => {
    const businessList = JSON.stringify(res.data.businesses);
    sessionStorage.setItem('businessList', businessList);
  }).catch((error) => {
    sessionStorage.setItem('businessList', null);
    return 'Business not found';
  });
}
