import { ADD_IMAGE } from '../actions/types';

const inItialState = {
  image: ''
};

export default (state = inItialState, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return action.image;

    default: return state;
  }
};
