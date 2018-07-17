import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import UserCard from '../../../components/user/UserCard';
import user from '../../__mockData__/userData';

configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    user,
    removeUser: jest.fn(),
    markUserToRemove: jest.fn()
  };

  return shallow(<UserCard {...props} />);
};


describe('Component: UserCard', () => {
  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(9);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('h5').length).toBe(1);
    expect(wrapper.find('button').length).toBe(3);
    expect(wrapper.find('.delete-button').simulate('click'));
    expect(wrapper.find('.dismiss-button').simulate('click'));
    expect(wrapper.find('.remove-user').simulate('click'));
    expect(wrapper.length).toBe(1);
  }) 
});