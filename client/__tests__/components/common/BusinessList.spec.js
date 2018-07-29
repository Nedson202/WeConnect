import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import BusinessList from '../../../components/common/BusinessList';
import businessData from '../../__mockData__/business';

const { allBusiness, business, paginationResult } = businessData;
configure({ adapter: new Adapter() });

let props, pathname;
const setup = () => {
  window = {
    location: {
    }
  }
  props = {
    filterBusiness: jest.fn(() => Promise.resolve()),
    fetchBusinesses: jest.fn(() => Promise.resolve()),
    fetchBusinessesByUserId: jest.fn(() => Promise.resolve()),
    businesses: allBusiness,
    business,
    paginate: paginationResult,
    queryData: business,
  };

  return shallow(<BusinessList {...props} />);
};


describe('Component: BusinessList', () => {
  beforeEach(() => {
    global.window = {
      window: () => {},
    }
  })

  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('span').length).toBe(1);
    wrapper.setProps({ businesses: [] });
    expect(wrapper.length).toBe(1);
    wrapper.setProps({ paginate: {}, business: [] });
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.find('Pagination').length).toBe(0);
    wrapper.setProps({ paginate: {
      totalBusiness: 3,
      limit: 5
    }, business: [] });
    expect(wrapper.find('div').length).toBe(4);
    wrapper.setProps({ paginate: {
      totalBusiness: undefined,
      limit: 5
    }, business: [] });
    expect(wrapper.find('Pagination').length).toBe(0);
    expect(toJSON(wrapper)).toMatchSnapshot();
  }) 
});

describe('Function test', () => {
  it('should call imageGenerator function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const imageGenerator = jest.spyOn(wrapper.instance(), 'imageGenerator');
    action.imageGenerator();
    expect(imageGenerator).toBeCalled();
  });

  it('should call onChange function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const onChange = jest.spyOn(wrapper.instance(), 'onChange');
    action.onChange(1);
    expect(onChange).toBeCalled();
  });
});