import userReducer from '../../reducers/users';
import userData from '../__mockData__/userData';
import {
  SET_USERS, USER_DELETED
} from '../../actions/types';

const { users } = userData;

const initialState = {
  user: users
};

const getUsers = {
  type: SET_USERS,
  users
};

const deleteUser = {
  type: USER_DELETED,
  userId: 2
}

describe('User reducer test', () => {
  it('should have a default state', () => {
    const newState = userReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should successfully display all user', () => {
    expect(userReducer(initialState, getUsers)).toEqual({
      ...initialState, user: getUsers.users
    });
  });

  it('should successfully delete a user', () => {
    const state = userReducer(initialState, deleteUser);
    expect(state.user.length).toEqual(2);
  });
});
