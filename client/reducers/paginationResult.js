import {
  PAGINATION_RESULT
 } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case PAGINATION_RESULT:

      return action.result;
    default: return state;
  }
};
