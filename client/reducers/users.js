import { SET_USERS, USER_DELETED } from '../actions/types';

const initialState = {
  user: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        user: action.users
      };

    case USER_DELETED:
      return {
        ...state,
        user: state.user.filter(user => user.id !== action.userId)
      };

    default: return state;
  }
};
