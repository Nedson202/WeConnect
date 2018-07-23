import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import UserList from '../../../components/user/UserList';
import userData from '../../__mockData__/userData';

configure({ adapter: new Adapter() });
const { users } = userData;
let props;
const setup = () => {
  props = {
    users,
    removeUser: jest.fn(() => Promise.resolve()),
    markUserToRemove: jest.fn(() => Promise.resolve())
  };

  return shallow(<UserList {...props} />);
};


describe('Component: UserList', () => {
  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(4);
    wrapper.setProps({ users: [] });
    expect(wrapper.find('div').length).toBe(3);
    wrapper.setProps({ users });
    expect(wrapper.find('div').length).toBe(4);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.length).toBe(1);
  }) 
});