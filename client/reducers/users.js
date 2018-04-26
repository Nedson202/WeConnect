import { SET_USERS, USER_DELETED } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;

    case USER_DELETED:
      return state.filter(user => user.id !== action.userId);

    default: return state;
  }
};
