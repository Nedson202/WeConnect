import React from 'react';
import { configure, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import ConnectedAdminPanel, { AdminPanel } from '../../../components/adminPanel/AdminPanel';
import businessData from '../../__mockData__/business';
import userData from '../../__mockData__/userData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { businesses, paginationResult} = businessData;
const { userUpdateData, users } = userData;
configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    deleteBusiness: jest.fn(() => Promise.resolve()),
    fetchBusinesses: jest.fn(() => Promise.resolve()),
    fetchUsers: jest.fn(() => Promise.resolve()),
    deleteUser: jest.fn(() => Promise.resolve()),
    users,
    user: userUpdateData,
    paginate: paginationResult,
    businesses,
    isLoading: false,
    image: {image:'path/to/image'},
    history: {}
  };

  return shallow(<AdminPanel {...props} />);
};

const event = {
  preventDefault: jest.fn()
};

describe('Component: AdminPanel', () => {
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
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.length).toBe(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('state to props', () => {
  let props;
  props = {
    match: {
      params: {id:1}
    },
  };

  it('should render connected adminpanel', () => {
    const businesses = {
      businesses,
      paginationResult
    };

    const users = {
      user: userUpdateData
    }

    const store = mockStore({
      businesses,
      users
    });
    const wrapper = shallow(<ConnectedAdminPanel store={store}  />);
    expect(wrapper.length).toBe(1);
  });
});

describe('Function test', () => {
  beforeEach(() => {
    global.toastr = {
      error: () => {}
    }
  });

  it('should call handleVisibility function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const handleVisibility = jest.spyOn(wrapper.instance(), 'handleVisibility');
    action.handleVisibility({ target: { files: ['1'] } });
    expect(handleVisibility).toBeCalled();
  });

  it('should call userVisibility function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const userVisibility = jest.spyOn(wrapper.instance(), 'userVisibility');
    action.userVisibility(event);
    expect(userVisibility).toBeCalled();
  });

  it('should call businessVisibility function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const businessVisibility = jest.spyOn(wrapper.instance(), 'businessVisibility');
    action.businessVisibility({ target: { files: ['1'] } });
    expect(businessVisibility).toBeCalled();
  });

  it('should call removeUser function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const removeUser = jest.spyOn(wrapper.instance(), 'removeUser');
    action.removeUser(1);
    expect(removeUser).toBeCalled();
  });

  it('should call markUserToRemove function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const markUserToRemove = jest.spyOn(wrapper.instance(), 'markUserToRemove');
    action.markUserToRemove(event);
    expect(markUserToRemove).toBeCalled();
  });
});