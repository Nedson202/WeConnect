import { TOGGLELOADER } from '../actions/types';

const initialState = {
  isLoading: true,
};

export default (state = initialState, action = initialState) => {
  switch (action.type) {
    case TOGGLELOADER:
      return action.loader;

    default: return state;
  }
};
