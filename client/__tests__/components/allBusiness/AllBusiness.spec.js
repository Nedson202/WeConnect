import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';import toJSON from 'enzyme-to-json';
import connectedAllBusiness, { AllBusiness} 
from '../../../components/businessListings/AllBusiness';
import businessData from '../../__mockData__/business';
import { mapStateToProps } from '../../../components/businessListings/AllBusiness';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { allBusiness, paginationResult } = businessData;
configure({ adapter: new Adapter() });

let props, businesses;
const setup = () => {
  props = {
    fetchBusinesses: jest.fn(() => Promise.resolve()),
    businesses: allBusiness,
    paginate: paginationResult,
    isLoading: false,
    loader: jest.fn(() => Promise.resolve())
  };

  return shallow(<AllBusiness {...props} />);
};


describe('Component: AllBusiness', () => {
  beforeEach(() => {
    global.document = {
      title: () => {}
    }
  })

  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('Spinner').length).toBe(0);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('BusinessList').length).toBe(1);
    wrapper.setProps({ isLoading: true, businesses: [] });
    expect(wrapper.find('Spinner').length).toBe(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.length).toBe(1);

    const state = {
      businesses: {
        businesses: allBusiness
      }
    }
    expect(mapStateToProps(state).businesses).toEqual(allBusiness);
    wrapper.setProps({ isLoading: true, businesses: [] });
    expect(wrapper.find('h2').length).toBe(0);
  })
});

describe('state to props', () => {
  it('should render connected allbusinesses page', () => {
    const businesses = {
      businesses,
      paginationResult
    };

    const store = mockStore({
      businesses,
      isLoading: false
    });
    const wrapper = shallow(<connectedAllBusiness store={store}  />);
    expect(wrapper.length).toBe(1);
  });
});