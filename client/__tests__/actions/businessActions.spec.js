import moxios from 'moxios';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import configureMockStore from 'redux-mock-store';
import 
  { businessRegistrationRequest, 
    businessUpdateRequest,
  }
from '../../actions/businessRegistrationAction';
import 
  { 
    fetchBusinesses, 
    fetchBusinessById, 
    fetchLocations, 
    fetchCategories, 
    fetchReviews,
    fetchBusinessesByUserId
  }
from '../../actions/fetchActions';
import { SET_CURRENT_USER, 
  TOGGLELOADER, 
  SET_BUSINESS_BY_ID, 
  SET_BUSINESSES, 
  PAGINATION_RESULT, 
  SET_LOCATIONS, 
  SET_CATEGORIES, 
  SET_REVIEWS, 
  FILTERED_BUSINESSES,  
  BUSINESS_DELETED,
  ADD_IMAGE
} from '../../actions/types';
import businessData from '../__mockData__/business';
import reviewData from '../__mockData__/reviews';
import filterBusiness from '../../actions/businessQueryAction';
import { businessImageUploader, uploadToCloudinary } from '../../actions/imageUpload';
import { deleteBusiness } from '../../actions/deleteAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Business action', () => {
  beforeEach(() => {
    localStorage.setItem('accessToken', token);
    global.toastr = {
      success: () => {},
      error: () => {}
    };
    global.document = {
      getElementById: () => jest.fn()
    };
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it(
    'should deny registration if user has no token',
    (done) => {
      const { business } = businessData;

      moxios.stubRequest('/api/v1/businesses', {
        status: 201,
        response: null
      });

      const expectedActions = [
        {
          type: TOGGLELOADER,
          loadingStatus: true
        },
        {
          type: SET_CURRENT_USER,
          user: {}
        }
      ];
      localStorage.setItem('accessToken', token);
      const userToken = localStorage.getItem('accessToken');

      const store = mockStore({});
      store.dispatch(businessRegistrationRequest(business, history))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(2);
          done();
        })
    }
  );
  it(
    'should dispatch updated businessdata to the store if request is sucessful',
    (done) => {
      const { business, updatedBusiness } = businessData;
      const { id } = businessData;
      moxios.stubRequest(`/api/v1/businesses/${id}`, {
        status: 201,
        response: business
      });

      const expectedActions = [
        {
          type: TOGGLELOADER,
          loadingStatus: true
        },
        {
          type: TOGGLELOADER,
          loadingStatus: false
        }
      ];

      const store = mockStore({});
      store.dispatch(businessUpdateRequest(id, business, history))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(2);
          done();
        })
    }
  );
  it(
    'should dispatch a business to the store if request is sucessful',
    async (done) => {
      const { business } = businessData;
      const { id } = business;
      
      moxios.stubRequest(`/api/v1/businesses/${id}`, {
        status: 200,
        response: {
          business
        }
      });

      const expectedActions = [
        {
          type: SET_BUSINESS_BY_ID,
          business
        },
        {
          type: TOGGLELOADER,
          loadingStatus: false
        }
      ];

      const store = mockStore({});
      await store.dispatch(fetchBusinessById(id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(2);
          done();
        })
    }
  );
  it(
    'should only toggle loading state if no business if found',
    async (done) => {
      const { business } = businessData;
      const { id } = business;
      
      moxios.stubRequest(`/api/v1/businesses/${id}`, {
        status: 200,
      });

      const expectedActions = [
        {
          type: TOGGLELOADER,
          loadingStatus: false
        }
      ];

      const store = mockStore({});
      await store.dispatch(fetchBusinessById(id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(1);
          done();
        })
    }
  );
  it(
    'should dispatch all business to the store if request is sucessful',
    (done) => {
      const { allBusiness, paginationResult } = businessData;
      const query = undefined;
      
      moxios.stubRequest(`/api/v1/businesses/?${query}`, {
        status: 200,
        response: {
          allData: {
            businesses: allBusiness,
            paginateResult: paginationResult
          }
        }
      });

      const businesses = allBusiness;
      const expectedActions = [
        {
          type: TOGGLELOADER,
          loadingStatus: true
        },
        {
          type: TOGGLELOADER,
          loadingStatus: false
        },
        {
          type: SET_BUSINESSES,
           businesses
        },
        {
          type: PAGINATION_RESULT,
          result: paginationResult
        }
      ];

      const store = mockStore({});
      store.dispatch(fetchBusinesses(query))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(4);
          done();
        })
    }
  );
  it(
    'should dispatch no business to the store if none is found',
    (done) => {
      const { allBusiness, paginationResult } = businessData;
      const query = undefined;
      
      moxios.stubRequest(`/api/v1/businesses/?${query}`, {
        status: 200,
        response: {
        }
      });

      const businesses = allBusiness;
      const expectedActions = [
        {
          type: TOGGLELOADER,
          loadingStatus: true
        },
        {
          type: TOGGLELOADER,
          loadingStatus: false
        },
        {
          type: SET_BUSINESSES,
           businesses: []
        }
      ];

      const store = mockStore({});
      store.dispatch(fetchBusinesses(query))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
          done();
        })
    }
  );
  
  it(
    'should dispatch no business to the store if none is found',
    (done) => {
      const query = undefined;
      
      moxios.stubRequest(`/api/v1/businesses/?${query}`, {
        status: 200,
        response: {
        }
      });

      const expectedActions = [
        {
          type: TOGGLELOADER,
          loadingStatus: true
        },
        {
          type: TOGGLELOADER,
          loadingStatus: false
        },
        {
          type: SET_BUSINESSES,
           businesses: []
        }
      ];

      const store = mockStore({});
      store.dispatch(fetchBusinesses(query))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
          done();
        })
    }
  );
  it(
    'should dispatch all locations to the store if request is sucessful',
    (done) => {
      const { locations } = businessData;
      
      moxios.stubRequest('/api/v1/locations', {
        status: 200,
        response: {locations}
      });

      const expectedActions = [
        {
          type: SET_LOCATIONS,
          locations
        }
      ];

      const store = mockStore({});
      store.dispatch(fetchLocations())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(1);
          done();
        })
    }
  );

  it(
    'should not dispatch updated business data to the store if request is unsucessful',
    (done) => {

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: ['Email is invalid']
        });
      });

      const store = mockStore({});
      store.dispatch(businessUpdateRequest(1, {}, {}))
        .then(() => {
          expect(store.getActions().length).toBe(2);
          done();
        })
    }
  );
  
  // it(
  //   'should not dispatch created business data to the store if request is unsucessful',
  //   (done) => {
  //     moxios.wait(() => {
  //       // localStorage.accessToken = token
  //       const request = moxios.requests.mostRecent();
  //       request.respondWith({
  //         status: 400,
  //         response: ['Email is invalid']
  //       });
  //     });

  //     const store = mockStore({});
  //     store.dispatch(businessRegistrationRequest())
  //       .then(() => {
  //         expect(store.getActions().length).toBe(2);
  //         done();
  //       })
  //   }
  // );

  it(
    'should dispatch all categories to the store if request is sucessful',
    (done) => {
      const { categories } = businessData;
      
      moxios.stubRequest('/api/v1/categories', {
        status: 200,
        response: {categories}
      });

      const expectedActions = [
        {
          type: SET_CATEGORIES,
          categories
        }
      ];

      const store = mockStore({});
      store.dispatch(fetchCategories())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(1);
          done();
        })
    }
  );
  it(
    'should dispatch all reviews to the store if request is sucessful',
    (done) => {
      const { reviews } = reviewData;
      const { business, paginationResult } = businessData;
      const { id } = business;
      const query = undefined;

      moxios.stubRequest(`/api/v1/businesses/${id}/reviews?${query}`, {
        status: 200,
        response: {
          allData: {
            reviews,
            paginatedReviewResult: paginationResult
          }
        }
      });

      const expectedActions = [
        {
          type: SET_REVIEWS,
          reviews
        },
        {
          type: PAGINATION_RESULT,
          result: paginationResult
        }
      ];

      const store = mockStore({});
      return store.dispatch(fetchReviews(id, query))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(2);
          done();
        })
    }
  );
  it(
    'should dispatch no reviews to the store if none is found',
    (done) => {
      const { business } = businessData;
      const { id } = business;
      const query = undefined;

      moxios.stubRequest(`/api/v1/businesses/${id}/reviews?${query}`, {
        status: 200,
        response: {
        }
      });

      const expectedActions = [
        {
          type: SET_REVIEWS,
          reviews: []
        }
      ];

      const store = mockStore({});
      return store.dispatch(fetchReviews(id, query))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(1);
          done();
        })
    }
  );
  it(
    'should dispatch search results to the store if request is sucessful',
    (done) => {
      const { business, paginationResult, allBusiness } = businessData;
      const query = 'undefined';
      const page = 'page=1';
      const option = 'location'

      moxios.stubRequest(`/api/v1/businesses?${option}=${query}&${page}`, {
        status: 200,
        response: {
          allData: {
            businesses: allBusiness,
            paginateResult: paginationResult
          }
        }
      });

      const expectedActions = [
        {
          type: FILTERED_BUSINESSES,
          searchResult: allBusiness
        },
        {
          type: PAGINATION_RESULT,
          result: paginationResult
        }
      ];

      const store = mockStore({});
      return store.dispatch(filterBusiness(option, query, page, history))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(2);
          done();
        })
    }
  );
  it(
    'should upload image url successfully to the database',
    (done) => {
      const { business } = businessData;
      const businessId = business.id;

      moxios.stubRequest(`/api/v1/business/${businessId}/image`, {
        status: 200,
        response: {
          business
        }
      });

      const expectedActions = [
        {
          type: SET_BUSINESS_BY_ID,
          business
        }
      ];

      const store = mockStore({});
      return store.dispatch(businessImageUploader(businessId, '/path/to/image'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(1);
          done();
        })
    }
  );

  it(
    'should successfully delete a business',
    (done) => {

      moxios.stubRequest('/api/v1/businesses/1', {
        status: 200,
        response: {
          id: 1
        }
      });

      const expectedActions = [
        {
          type: BUSINESS_DELETED,
          businessId: 1
        }
      ];

      const store = mockStore({});
      return store.dispatch(deleteBusiness(1, 'allen', history))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(1);
          done();
        })
    }
  ); 
});
