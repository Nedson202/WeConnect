import axios from 'axios';
import { SET_USERS } from './types';

export function setUsers(users) {
  return {
    type: SET_USERS,
    users
  };
}


export function fetchUsers() {
  return dispatch => axios.get('http://localhost:4000/api/v1/admin/users').then((res) => {
    const { data } = res;
    dispatch(setUsers(data.users));
  });
}
