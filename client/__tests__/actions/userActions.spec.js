import moxios from 'moxios';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import configureMockStore from 'redux-mock-store';
import 
  { userLoginRequest, 
    userSignupRequest, 
    userProfileUpdateRequest, 
    logout
  }
from '../../actions/userActions';
import { SET_CURRENT_USER, TOGGLELOADER, SET_USERS, USER_DELETED  } from '../../actions/types';
import mockData from '../__mockData__/userData';
import { fetchUsers } from '../../actions/fetchActions';
import userData from '../__mockData__/userData';
import { deleteUser } from '../../actions/deleteAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Signin action', () => {
  beforeEach(() => {
    moxios.install();
    global.toastr = {
      success: () => {},
      error: () => {}
    };
    global.data = {
      map: () => {}
    }
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it(
    'should dispatch login data to the store if request is sucessful',
    (done) => {
      const { authResponse, loginData, errorResponse } = mockData;

      moxios.stubRequest('/api/v1/auth/login', {
        status: 200,
        response: authResponse
      });

      const expectedActions = [
        {
          type: TOGGLELOADER,
          loadingStatus: true
        },
        {
          type: SET_CURRENT_USER,
          user: jwt.decode(authResponse.data.token),
        },
        {
          type: TOGGLELOADER,
          loadingStatus: false
        }
      ];

      localStorage.setItem('accessToken', token);
      expect(localStorage.accessToken).toEqual(token);

      const store = mockStore({});
      return store.dispatch(userLoginRequest(loginData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
          done();
        })
    }
  );

  it('should dispatch update data to the store if request is sucessful',
    async (done) => {
      const { userDetailsToUpdate, userUpdateResponse, userUpdateData } = mockData;
      const { id } = userDetailsToUpdate;

      moxios.stubRequest(`/api/v1/user/${id}`, {
        status: 200,
        response: userUpdateResponse
      });

      const expectedActions = [
        {
          type: SET_CURRENT_USER,
          user: jwt.decode(userUpdateResponse.token),
        }
      ];

      localStorage.setItem('accessToken', token);
      localStorage.setItem('image', userUpdateData.image);
      expect(localStorage.getItem('accessToken')).toEqual(token);
      expect(localStorage.getItem('image')).toEqual(userUpdateData.image);

      const store = mockStore({});
      await store.dispatch(userProfileUpdateRequest(id, userDetailsToUpdate))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        })
    });

  it(
    'should dispatch login data to the store if request is sucessful',
    (done) => {
      const { authResponse, signupData, errorResponse } = mockData;

      moxios.stubRequest('/api/v1/auth/signup', {
        status: 201,
        response: authResponse,
        error: errorResponse
      });

      const expectedActions = [
        {
          type: TOGGLELOADER,
          loadingStatus: true
        },
        {
          type: SET_CURRENT_USER,
          user: jwt.decode(authResponse.data.token),
        },
        {
          type: TOGGLELOADER,
          loadingStatus: false
        }
      ];

      localStorage.setItem('accessToken', token);
      expect(localStorage.getItem('accessToken')).toEqual(token);

      const store = mockStore({});
      return store.dispatch(userSignupRequest(signupData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
          done();
        })
    }
  ); 

  it(
    'should not dispatch login data to the store if request is unsucessful',
    (done) => {

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: ['Email is invalid']
        });
      });

      const store = mockStore({});
      return store.dispatch(userLoginRequest({}))
        .then(() => {
          expect(store.getActions().length).toBe(2);
          done();
        })
    }
  );  

  it(
    'should not dispatch signup data to the store if request is unsucessful',
    (done) => {

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: ['Email is invalid']
        });
      });

      const store = mockStore({});
      return store.dispatch(userSignupRequest({}))
        .then(() => {
          expect(store.getActions().length).toBe(2);
          done();
        })
    }
  );  

  it(
    'should not dispatch updated data to the store if request is unsucessful',
    (done) => {

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: ['Email is invalid']
        });
      });

      const store = mockStore({});
      return store.dispatch(userProfileUpdateRequest(1, {}))
        .then(() => {
          expect(store.getActions().length).toBe(0);
          done();
        })
    }
  );  

  it('should dispatch action to logout user',
    async (done) => {
      const expectedActions = [
        {
          type: SET_CURRENT_USER,
          user: {},
        }
      ];

      localStorage.setItem('accessToken', token);
      localStorage.removeItem('accessToken');

      const store = mockStore({});
      await store.dispatch(logout());
      expect(localStorage.accessToken).toBeUndefined();
      expect(store.getActions()).toEqual(expectedActions);
      done();
    }
  );  

  it(
    'should dispatch all users to the store if request is sucessful',
    (done) => {
      const { users } = userData;
      moxios.stubRequest('/api/v1/admin/users', {
        status: 200,
        response: {
          userArray: users
        }
      });

      const expectedActions = [
        {
          type: SET_USERS,
          users
        }
      ];

      const store = mockStore({});
      return store.dispatch(fetchUsers())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(1);
          done();
        })
    }
  );

  it(
    'should successfully delete a user',
    (done) => {

      moxios.stubRequest('/api/v1/admin/users/1', {
        status: 200,
        response: {
          id: 1
        }
      });

      const expectedActions = [
        {
          type: USER_DELETED,
          userId: 1
        }
      ];

      const store = mockStore({});
      return store.dispatch(deleteUser(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(1);
          done();
        })
    }
  ); 
});
