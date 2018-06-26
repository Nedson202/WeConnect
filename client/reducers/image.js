import {
  ADD_IMAGE
 } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_IMAGE:
      return action.image;

    default: return state;
  }
};
