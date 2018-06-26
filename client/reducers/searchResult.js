import {
  FILTERED_BUSINESSES
 } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case FILTERED_BUSINESSES:
      return action.searchResult;

    default: return state;
  }
};
