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
import { SET_CURRENT_USER, TOGGLELOADER, SET_USERS  } from '../../actions/types';
import mockData from '../__mockData__/userData';
import { fetchUsers } from '../../actions/fetchActions';
import userData from '../__mockData__/userData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Signin action', () => {
  beforeEach(() => {
    moxios.install();
    global.toastr = {
      success: () => {},
      error: () => {}
    };
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
  it('should dispatch action to logout user',
    async (done) => {
      const expectedActions = [
        {
          type: SET_CURRENT_USER,
          user: {},
        }
      ];

      localStorage.setItem('accessToken', token);
      expect(localStorage.removeItem('accessToken')).toEqual(true);

      const store = mockStore({});
      await store.dispatch(logout());
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
      store.dispatch(fetchUsers())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(1);
          done();
        })
    }
  );
});
