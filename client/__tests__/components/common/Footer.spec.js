import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../../../components/common/Footer';

configure({ adapter: new Adapter() });

describe('Component: Footer', () => {
  it('should successfully render', () => {
    const wrapper = shallow(<Footer />);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('footer').length).toBe(1);
  });
});