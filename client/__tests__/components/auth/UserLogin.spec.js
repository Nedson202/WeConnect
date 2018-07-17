import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import ConnectedLogin, { Login } from '../../../components/login/Login';
import LoginForm from '../../../components/login/LoginForm';
import state from '../../__mockData__/userData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { loginState } = state;

configure({ adapter: new Adapter() });
localStorage = {};

const props = {
  userLoginRequest: jest.fn(() => Promise.resolve()),
  history: {},
  isLoading: false,
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  state: loginState
};

const setup = () => {
  return shallow(<Login {...props} />);
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
  password: 'test@test.com'
}

describe('User login component', () => {
  beforeEach(() => {
    global.document = {
      title: () => {}
    }
  })

  it('should render login component', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('LoginForm').length).toBe(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  }) 

  it('should render login form', () => {
    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('i').length).toBe(3);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('button').simulate('click'));
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('TextField').length).toBe(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  }) 

  it('should render connected login', () => {
    const store = mockStore({});
    const wrapper = shallow(<connectedLogin store={store} />);
    expect(wrapper.length).toBe(1);
  }) 
});

describe('Login onchange method', () => {
  beforeEach(() => {
    global.document = {
      title: () => {}
    }
  });
  
  
  it('should simulate input change', () => {
    const wrapper = setup();
    const loginForm = wrapper.find('LoginForm');
    loginForm.simulate('change', event('username', userData.username));
    expect(wrapper.instance().state.username).toBe(userData.username);
    loginForm.simulate('change', event('password', userData.password));
    expect(wrapper.instance().state.password).toBe(userData.password);
  });
});

describe('Submit function', () => {
  it('should login user when user details is set to the state', () => {
    const wrapper = setup();
    const loginForm = wrapper.find('LoginForm');
    // const button = loginForm.find('#submit-button');
    wrapper.setState(userData);

    loginForm.simulate('submit', event());
  });
});

