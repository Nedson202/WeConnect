import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import BusinessCard from '../../../components/common/BusinessCard';
import business from '../../__mockData__/business';

configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = business;

  return shallow(<BusinessCard {...props} />);
};


describe('Component: BusinessCard', () => {
  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(7);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Link').length).toBe(2);
    expect(wrapper.find('Truncate').length).toBe(1);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.length).toBe(1);
  }) 
});