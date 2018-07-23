import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NotFound from '../../../components/common/NotFound';

configure({ adapter: new Adapter() });

describe('Component: NotFound', () => {
  it('should successfully render', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('h1').length).toBe(1);
  });
});