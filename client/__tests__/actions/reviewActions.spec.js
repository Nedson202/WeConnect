import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import 
  { reviewRequest, 
    reviewUpdateRequest
  }
from '../../actions/postReviewAction';
import { 
  SET_CURRENT_USER, 
  ADD_REVIEW, 
  EDIT_REVIEW, 
  REVIEW_DELETED  
} from '../../actions/types';
import { review } from '../__mockData__/business';
import { deleteReview } from '../../actions/deleteAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Review actions', () => {
  beforeEach(() => {
    moxios.install();
    global.toastr = {
      success: () => {},
      error: () => {}
    };
    global.window = {
      location: {
        replace: () => {}
      },
    }
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it(
    'should dispatch posted review to the store if request is sucessful',
    (done) => {
      moxios.stubRequest('/api/v1/businesses/1/reviews', {
        status: 200,
        response: {msg:'success'}
      });

      const expectedActions = [
        {
          type: SET_CURRENT_USER,
          user: {}
        },
        {
          type: ADD_REVIEW,
          review: undefined
        },
      ];

      const store = mockStore({});
      store.dispatch(reviewRequest(1, review, () => {}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(2);
          done();
        })
    }
  );

  it(
    'should dispatch posted review to the store if request is sucessful',
    (done) => {
      moxios.stubRequest('/api/v1/businesses/1/reviews/1', {
        status: 200,
        response: {msg:'success'}
      });

      const expectedActions = [
        {
          type: SET_CURRENT_USER,
          user: {}
        },
        {
          type: EDIT_REVIEW,
          review: undefined
        },
      ];

      const store = mockStore({});
      store.dispatch(reviewUpdateRequest(1, 1, review, () => {}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(2);
          done();
        });
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
      return store.dispatch(reviewUpdateRequest(1, 1, review, {}))
        .then(() => {
          expect(store.getActions().length).toBe(1);
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
      return store.dispatch(reviewRequest(1, review, {}))
        .then(() => {
          expect(store.getActions().length).toBe(1);
          done();
        })
    }
  ); 

  it(
    'should successfully delete a review',
    (done) => {

      moxios.stubRequest('/api/v1/businesses/1/reviews/1', {
        status: 200,
        response: {
          reviewId: 1
        }
      });

      const expectedActions = [
        {
          type: REVIEW_DELETED,
          reviewId: 1
        }
      ];

      const store = mockStore({});
      store.dispatch(deleteReview(1, 1, () => {}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(1);
          done();
        })
    }
  ); 
});
