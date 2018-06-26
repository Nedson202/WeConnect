import axios from 'axios';
import { SET_USERS } from './types';

const setUsers = users => ({
  type: SET_USERS,
  users
});

/**
 * @description function to dispatch an action to filter recipes
 * 
 * @return {Object} action dispatched by the action creator
 */
const fetchUsers = () => dispatch => axios.get('/api/v1/admin/users').then((res) => {
  const { userArray } = res.data;
  dispatch(setUsers(userArray));
});  

export default fetchUsers;
