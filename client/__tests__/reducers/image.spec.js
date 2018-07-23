import imageReducer from '../../reducers/image';
import {
  ADD_IMAGE
} from '../../actions/types';

const initialState = {
  image: ''
};

const imageHandler = {
  type: ADD_IMAGE,
  image: '/path/to/image'
}

describe('User reducer test', () => {
  it('should have a default state', () => {
    const newState = imageReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should successfully authenticate a user', () => {
    const state = imageReducer(initialState, imageHandler);
    expect(state).toEqual('/path/to/image');
  });
});
