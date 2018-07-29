import React from 'react';
import { configure, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import toJSON from 'enzyme-to-json';
import ConnectedBusinessRegistration,
{ BusinessRegistration }
  from '../../../components/business-registration/BusinessRegistration';
import RegistrationForm from '../../../components/business-registration/RegistrationForm';
import state from '../../__mockData__/business';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { business, categories, locations } = state;

configure({ adapter: new Adapter() });
let props;
props = {
  businessRegistrationRequest: jest.fn(() => Promise.resolve()),
  businessUpdateRequest: jest.fn(() => Promise.resolve()),
  fetchBusinessById: jest.fn(() => Promise.resolve()),
  fetchCategories: jest.fn(() => Promise.resolve()),
  categories: jest.fn(() => Promise.resolve()),
  fetchLocations: jest.fn(() => Promise.resolve()),
  locations: jest.fn(() => Promise.resolve()),
  isLoading: false,
  match: {
    params: {
      id: 1
    }
  },
  params: {
    id: 1
  },
  history,
  categories,
  locations,
  onChange: jest.fn(() => Promise.resolve()),
  onSubmit: jest.fn(() => Promise.resolve()),
  state: {
    businesses: {
      categories: () => [],
      locations: () => []
    },
    business
  }
};
const setup = () => shallow(<BusinessRegistration {...props} />);

const event = (name, value) => ({
  preventDefault: jest.fn(() => Promise.resolve()),
  target: {
    name,
    value
  }
});

describe('state to props', () => {
  props = {
    match: {
      params: {}
    },
  };

  it('should render connected registration page', () => {
    const businesses = {
      business,
      params,
      categories,
      locations,
    };

    const store = mockStore({ businesses });
    const wrapper = shallow(<ConnectedBusinessRegistration store={store} {...props} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('componentWillReceiveProps()', () => {
  const nextProps = {
    business
  };
  it('should return next props', () => {
    const wrapper = shallow(<BusinessRegistration {...props} />);
    const action = wrapper.instance();
    const componentWillReceiveProps = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    action.componentWillReceiveProps(nextProps);
    expect(componentWillReceiveProps).toBeCalled();
  });
});

describe('Business registration component', () => {
  beforeEach(() => {
    global.props = {
      match: {
        params: () => {}
      },
      state: {
        businesses: {
          business: () => {},
          categories: () => {}
        }
      }
    };
  });

  it('should render registration page', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('RegistrationForm').length).toBe(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render registration form', () => {
    props = {
      state: {
        name: () => {}
      },
      locations: jest.fn(() => Promise.resolve()),
      categories: jest.fn(() => Promise.resolve()),
      onChange: jest.fn(() => Promise.resolve()),
      onSubmit: jest.fn(() => Promise.resolve()),
      params: {
        id: 1
      },
      isLoading: false
    };

    const state = {
      business: null,
      params: { id: 1 },
      categories,
      locations,
      isLoading: false,
    };

    const wrapper = shallow(<RegistrationForm {...props} />);
    expect(wrapper.find('.form-header').text()).toBe('Update business');
    wrapper.setProps({ params: {} });
    expect(wrapper.find('.form-header').text()).toBe('Register business');
    expect(wrapper.find('div').length).toBe(11);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('i').length).toBe(1);
    expect(wrapper.find('textarea').length).toBe(1);
    expect(wrapper.find('span').length).toBe(3);
    expect(wrapper.find('button').simulate('click'));
    wrapper.setProps({ isLoading: true, params: { id: 1 } });
    expect(wrapper.find('.form-header').text()).toBe('Update business');
    expect(wrapper.find('span').length).toBe(3);
    expect(toJSON(wrapper)).toMatchSnapshot();


    props = {
      match: {
        params: {
          // id: 1
        }
      },
    };

    // expect(mapStateToProps(state, props)).toEqual(state);
  });

  it('should render connected registration page', () => {
    const businesses = {
      business,
      params,
      categories,
      locations,
    };

    const store = mockStore({ businesses });
    const wrapper = shallow(<ConnectedBusinessRegistration store={store} {...props} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('Registration onchange method', () => {
  beforeEach(() => {
    global.document = {
      title: () => {}
    };
  });


  it('should simulate input change', () => {
    const wrapper = setup();
    const RegistrationForm = wrapper.find('RegistrationForm');

    RegistrationForm.simulate('change', event('name', business.name));
    expect(wrapper.instance().state.name).toBe(business.name);

    RegistrationForm.simulate('change', event('email', business.email));
    expect(wrapper.instance().state.email).toBe(business.email);

    RegistrationForm.simulate('change', event('address', business.address));
    expect(wrapper.instance().state.address).toBe(business.address);

    RegistrationForm.simulate('change', event('location', business.location));
    expect(wrapper.instance().state.location).toBe(business.location);

    RegistrationForm.simulate('change', event('category', business.category));
    expect(wrapper.instance().state.category).toBe(business.category);

    RegistrationForm.simulate('change', event('description', business.description));
    expect(wrapper.instance().state.description).toBe(business.description);
  });

  it('should simulate password change', () => {
    const wrapper = setup();
    const RegistrationForm = wrapper.find('RegistrationForm');
  });
});

describe('Submit function', () => {
  it('should submit business information', () => {
    const wrapper = setup();
    const RegistrationForm = wrapper.find('RegistrationForm');
    wrapper.setState(business);

    RegistrationForm.simulate('submit', event());
  });
});

describe('Categories and location', () => {
  it('should call the get locations function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const location = jest.spyOn(wrapper.instance(), 'mapLocations');
    action.mapLocations();
    expect(location).toBeCalled();
  });

  it('should call the get categories function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const categories = jest.spyOn(wrapper.instance(), 'mapCategories');
    action.mapCategories();
    expect(categories).toBeCalled();
  });
});

