import axios from 'axios';

export default function setAuthToken(token) {
  const instance = axios.create({
    baseURL: 'http://localhost:4000/api/v1/'
  })

  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
