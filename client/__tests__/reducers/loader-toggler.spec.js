import loaderToggler from '../../reducers/loaderToggler';
import {
  TOGGLELOADER
} from '../../actions/types';

const initialState = false;

const loader = {
  type: TOGGLELOADER,
  loadingStatus: true
}

describe('User reducer test', () => {
  it('should have a default state', () => {
    const newState = loaderToggler(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should successfully authenticate a user', () => {
    const state = loaderToggler(initialState, loader);
    expect(state).toEqual(true);
  });
});
