import axios from 'axios';
import { USER_DELETED } from './types';

/**
 * @description function to dispatch an action to filter recipes
 * 
 * @param {Oject} userId
 * 
 * @return {Object} action dispatched by the action creator
 */
const userDeleted = userId => ({
  type: USER_DELETED,
  userId
});

/**
 * @description function to dispatch an action to filter recipes
 * 
 * @param {Oject} id
 * 
 * @return {Object} action dispatched by the action creator
 */
const deleteUser = id => dispatch => axios.delete(`http://localhost:4000/api/v1/admin/users/${id}`).then(() => {
  dispatch(userDeleted(id));
});

export default deleteUser;
