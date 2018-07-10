import axios from 'axios';

/**
   * @description Fetch reviews and business
   *
   * @param {any} token
   *
   * @returns {undefined}
   *
   * @memberof ReviewModal
   */
const setAuthToken = (token) => {
  const instance = axios.create({
    baseURL: 'http://localhost:4000/api/v1/'
  });

  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default setAuthToken;

