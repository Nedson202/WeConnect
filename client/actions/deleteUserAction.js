import axios from 'axios';
import { USER_DELETED } from './types';

export function userDeleted(userId) {
  return {
    type: USER_DELETED,
    userId
  };
}

export function deleteUser(id) {
  return dispatch => axios.delete(`http://localhost:4000/api/v1/admin/users/${id}`).then(() => {
    dispatch(userDeleted(id));
  });
}
