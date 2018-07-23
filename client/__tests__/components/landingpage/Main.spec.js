import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import Main from '../../../components/landingPage/Main';

configure({ adapter: new Adapter() });

describe('Component: App', () => {
  it('should render', () => {
  const wrapper = shallow(<Main />);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('Welcome to WeConnect');
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').text()).toBe('Explore');
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('Link').length).toBe(1);
  }) 
});