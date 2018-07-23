import authReducer from '../../reducers/auth';
import user from '../__mockData__/userData';
import {
  SET_CURRENT_USER
} from '../../actions/types';

const { userData, usersData } = user;

const initialState = {
  user,
  isAuthenticated: false
};

const authenticateUser = {
  type: SET_CURRENT_USER,
  user
}

describe('User reducer test', () => {
  it('should have a default state', () => {
    const newState = authReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should successfully authenticate a user', () => {
    const state = authReducer(initialState, authenticateUser);
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
  });
});
