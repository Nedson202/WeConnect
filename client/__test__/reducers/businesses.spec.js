import businessReducer from '../../reducers/businesses';
import businessMock from '../__mockData__/business';
import {
  ADD_BUSINESS,
  SET_BUSINESSES,
  SET_BUSINESSES_BY_ID,
  SET_BUSINESS_BY_ID,
  FILTERED_BUSINESSES,
  BUSINESS_DELETED,
  SET_LOCATIONS,
  SET_CATEGORIES,
  PAGINATION_RESULT,
  ADD_REVIEW
} from '../../actions/types';

const initialState = {
  businesses: [],
  businessOwnedByUser: [],
  business: {},
  searchResult: [],
  locations: [],
  categories: [],
  paginationResult: {},
  reviews: [],
};

const {
  business,
  allBusiness,
  usersBusiness,
  locations,
  categories,
  paginationResult,
  review
} = businessMock;

const addBusiness = {
  type: ADD_BUSINESS,
  business
};

const getBusinesses = {
  type: SET_BUSINESSES,
  businesses: allBusiness
};

const getBusinessesOwnedByUser = {
  type: SET_BUSINESSES_BY_ID,
  businesses: usersBusiness
};

const getBusiness = {
  type: SET_BUSINESS_BY_ID,
  business
};

const filterBusinesses = {
  type: FILTERED_BUSINESSES,
  searchResult: allBusiness
};

const deleteBusiness = {
  type: BUSINESS_DELETED,
  businessId: 1
};

const fetchLocations = {
  type: SET_LOCATIONS,
  locations
};

const fetchCategories = {
  type: SET_CATEGORIES,
  categories
};

const getPaginationData = {
  type: PAGINATION_RESULT,
  result: paginationResult
};

const addReview = {
  type: ADD_REVIEW,
  review
};

describe('Business reducer test', () => {
  it('should have a default state', () => {
    const newState = businessReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should add business successfully', () => {
    const newState = businessReducer(initialState, addBusiness);
    expect(newState).toEqual([
      ...initialState, addBusiness.business
    ]);
  });

  it('should successfully display all business', () => {
    expect(businessReducer(initialState, getBusinesses)).toEqual({
      ...initialState, businesses: getBusinesses.businesses
    });
  });

  it('should successfully display businesses owned by a user', () => {
    expect(businessReducer(initialState, getBusinessesOwnedByUser)).toEqual({
      ...initialState, businessOwnedByUser: getBusinessesOwnedByUser.businesses
    });
  });

  it('should successfully display a business', () => {
    expect(businessReducer(initialState, getBusiness)).toEqual({
      ...initialState, business: getBusiness.business
    });
  });

  it('should successfully filter business list', () => {
    expect(businessReducer(initialState, filterBusinesses)).toEqual({
      ...initialState, searchResult: filterBusinesses.searchResult
    });
  });

  // it('should successfully delete a business', () => {
  //   const state = businessReducer(initialState.businessOwnedByUser, deleteBusiness);
  //   expect(state.)
  // expect(businessReducer(initialState.businessOwnedByUser, deleteBusiness)).toEqual({
  //   ...initialState, businessId: deleteBusiness.id
  // });
  // });

  it('should return all business locations', () => {
    expect(businessReducer(initialState, fetchLocations)).toEqual({
      ...initialState, locations: fetchLocations.locations
    });
  });

  it('should return all business categories', () => {
    expect(businessReducer(initialState, fetchCategories)).toEqual({
      ...initialState, categories: fetchCategories.categories
    });
  });

  it('should set data needed for client side pagination', () => {
    expect(businessReducer(initialState, getPaginationData)).toEqual({
      ...initialState, paginationResult: getPaginationData.result
    });
  });

  it('should add review successfully', () => {
    const newState = businessReducer(initialState, addReview);
    expect(newState).toEqual([
      ...initialState, addReview.review
    ]);
  });

  it('should successfully display all reviews', () => {
    expect(businessReducer(initialState, getBusinesses)).toEqual({
      ...initialState, businesses: getBusinesses.businesses
    });
  });
});
