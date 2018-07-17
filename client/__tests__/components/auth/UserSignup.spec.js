import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import toJSON from 'enzyme-to-json';
import ConnectedSignup, { Signup } from '../../../components/signup/Signup';
import SignupForm from '../../../components/signup/signupForm';
import state from '../../__mockData__/userData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { signupState } = state;

configure({ adapter: new Adapter() });
localStorage = {};

const props = {
  userSignupRequest: jest.fn(() => Promise.resolve()),
  history: {},
  isLoading: false,
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  state: signupState
};

const setup = () => {
  return shallow(<Signup {...props} />);
};

const event = (name, value) => ({
  preventDefault: jest.fn(),
  target: {
    name,
    value
  }
});

const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test@test.com'
}

describe('User signup component', () => {
  beforeEach(() => {
    global.document = {
      title: () => {}
    }
  })

  it('should render signup component', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('SignupForm').length).toBe(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  }) 

  it('should render signup form', () => {
    const wrapper = shallow(<SignupForm {...props} />);
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('i').length).toBe(3);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('button').simulate('click'));
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('TextField').length).toBe(2);
    expect(toJSON(wrapper)).toMatchSnapshot();
  }) 

  it('should render connected signup', () => {
    const store = mockStore({});
    const wrapper = shallow(<ConnectedSignup store={store} />);
    expect(wrapper.length).toBe(1);
  }) 
});

describe('Signup onchange method', () => {
  beforeEach(() => {
    global.document = {
      title: () => {}
    }
  });
  
  
  it('should simulate input change', () => {
    const wrapper = setup();
    const SignupForm = wrapper.find('SignupForm');
    SignupForm.simulate('change', event('username', userData.username));
    expect(wrapper.instance().state.username).toBe(userData.username);
    SignupForm.simulate('change', event('email', userData.email));
    expect(wrapper.instance().state.email).toBe(userData.email);
    SignupForm.simulate('change', event('password', userData.password));
    expect(wrapper.instance().state.password).toBe(userData.password);
  });
});

describe('Submit function', () => {
  it('should login user when user details is set to the state', () => {
    const wrapper = setup();
    const SignupForm = wrapper.find('SignupForm');
    // const button = SignupForm.find('#submit-button');
    wrapper.setState(userData);

    SignupForm.simulate('submit', event());
  });
});

