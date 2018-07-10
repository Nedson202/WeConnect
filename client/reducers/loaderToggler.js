import { TOGGLELOADER } from '../actions/types';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLELOADER:
      return action.loadingStatus;

    default: return state;
  }
};
