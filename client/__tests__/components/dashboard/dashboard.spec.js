import React from 'react';
import { configure, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import ConnectedDashboard, { Dashboard } from '../../../components/dashboard/Dashboard';
import businessData from '../../__mockData__/business';
import userData from '../../__mockData__/userData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { businesses, paginationResult} = businessData;
const { userUpdateData } = userData;
configure({ adapter: new Adapter() });

let props, store, match;
const setup = () => {
  props = {
    onChange: jest.fn(() => Promise.resolve()),
    onImageChange: jest.fn(() => Promise.resolve()),
    userProfileUpdateRequest: jest.fn(() => Promise.resolve()),
    fetchBusinesses: jest.fn(() => Promise.resolve()),
    uploadToCloudinary: jest.fn(() => Promise.resolve()),
    onSubmit: jest.fn(() => Promise.resolve()),
    fetchBusinessesByUserId: jest.fn(() => Promise.resolve()),
    user: userUpdateData,
    paginate: paginationResult,
    businesses,
    isLoading: false,
    image: {image:'path/to/image'},
  };

  return shallow(<Dashboard {...props} />);
};

const event = {
  preventDefault: jest.fn()
};

describe('Component: Dashboard', () => {
  beforeEach(() => {
    global.document = {
      title: () => {}
    },
    global.props = {
      match: {
        params: () => {}
      }
    }
    global.match = {
      params: () => {}
    }
  })

  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('Spinner').length).toBe(0);
    expect(wrapper.find('button').length).toBe(2);
    expect(wrapper.find('BusinessList').length).toBe(1);
    expect(wrapper.find('UserProfileUpdate').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('h3').length).toBe(1);
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('Spinner').length).toBe(1);
    expect(wrapper.find('BusinessList').length).toBe(0);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('Function test', () => {
  beforeEach(() => {
    global.toastr = {
      error: () => {}
    }
  });

  it('should call imageChange function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const imageChange = jest.spyOn(wrapper.instance(), 'onImageChange');
    action.onImageChange({ target: { files: ['1'] } });
    expect(imageChange).toBeCalled();
  });

  it('should call handleProfileVisibility function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const handleProfileVisibility = jest.spyOn(wrapper.instance(), 'handleProfileVisibility');
    action.handleProfileVisibility();
    expect(handleProfileVisibility).toBeCalled();
  });
});

describe('Review onchange method', () => {
  beforeEach(() => {
    global.document = {
      title: () => {}
    }
  });
  
  it('should simulate input change', () => {
    const event = (name, value) => ({
      preventDefault: jest.fn(() => Promise.resolve()),
      target: {
        name,
        value
      }
    });

    const wrapper = setup();
    const profileUpdateForm = wrapper.find('UserProfileUpdate');
    
    profileUpdateForm.simulate('change', event('username', userUpdateData.username));
    expect(wrapper.instance().state.username).toBe(userUpdateData.username);

    profileUpdateForm.simulate('change', event('email', userUpdateData.rating));
    expect(wrapper.instance().state.email).toBe(userUpdateData.rating);
  });
});

describe('Submit function', () => {
  it('should submit review', () => {
    const wrapper = setup();
    const profileUpdateForm = wrapper.find('UserProfileUpdate');
    wrapper.setState(userUpdateData);

    profileUpdateForm.simulate('submit', event);
  });
});

describe('state to props', () => {
  let props;
  props = {
    match: {
      params: {}
    },
  };

  it('should render connected registration page', () => {
    const businesses = {
      businessOwnedByUser: businesses,
      paginationResult
    }

    const auth = {
      user: userUpdateData
    }

    const store = mockStore({
      businesses,
      auth,
      image: props.image,
      isLoading: props.isLoading
    });
    const wrapper = shallow(<ConnectedDashboard store={store}  />);
    expect(wrapper.length).toBe(1);
  });
});