import React from 'react';
import { configure, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import toJSON from 'enzyme-to-json';
import connectedSearchResultPage,  { SearchResultPage } 
from '../../../components/search/SearchResultPage';
import businessData from '../../__mockData__/business';
import { mapStateToProps } from '../../../components/search/SearchResultPage';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const { allBusiness, paginationResult } = businessData;
let props, queryData;
const setup = () => {
  props = {
    businesses: allBusiness,
    paginate: paginationResult,
    filterBusiness: jest.fn(() => Promise.resolve()),
    onSubmit: jest.fn(() => Promise.resolve())
  };

  return shallow(<SearchResultPage {...props} />);
};


describe('Component: SearchResultPage', () => {
  let store;
  beforeEach(() => {
    global.document = {
      title: () => {}
    }
    global.queryData = {
      queryData: () => paginationResult.queryData
    }
  })

  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('BusinessList').length).toBe(1);
    wrapper.setProps({ businesses: [] });
    expect(wrapper.find('div').length).toBe(2);
    expect(toJSON(wrapper)).toMatchSnapshot();

    const state = {
      businesses: {
        searchResult: allBusiness,
        paginationResult
      }
    };

    expect(mapStateToProps(state).businesses).toEqual(allBusiness);
    const paginate = {
      page: 1,
      limit: 6,
      totalBusiness: 10,
      totalReviews: 10,
      queryData: {}
    }
    wrapper.setProps({ paginate });
    expect(wrapper.find('h1').length).toBe(0);
  }) 

  it('should render connect component', () => {
    const wrapper = shallow(<connectedSearchResultPage store={store} />);
    expect(wrapper.length).toBe(1);
  }) 
});