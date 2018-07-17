import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import UserProfileUpdate from '../../../components/user/UserProfileUpdate';
import userInfo from '../../__mockData__/userData';

configure({ adapter: new Adapter() });
const { state, userData } = userInfo;
let props;
const setup = () => {
  props = {
    state,
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    user: userData,
    uploadToCloudinary: jest.fn(),
    onImageChange: jest.fn()
  };

  return shallow(<UserProfileUpdate {...props} />);
};


describe('Component: UserProfileUpdate', () => {
  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(10);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('h4').text()).toBe('Edit profile');
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('.close').simulate('click'));
    expect(wrapper.find('#profile-update-button').simulate('click'));
    expect(wrapper.length).toBe(1);
  }) 
});