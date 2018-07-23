// import React from 'react';
// import { configure, shallow, mount } from 'enzyme';
// import thunk from 'redux-thunk';
// import Adapter from 'enzyme-adapter-react-16';
// import configureMockStore from 'redux-mock-store';
// import toJSON from 'enzyme-to-json';
// import ConnectedBusinessRegistration, 
//   { BusinessRegistration, mapStateToProps } 
//   from '../../../components/business-registration/BusinessRegistration';
// import RegistrationForm from '../../../components/business-registration/RegistrationForm';
// import state from '../../__mockData__/business';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
// const { business, categories, locations } = state;

// configure({ adapter: new Adapter() });
// let props;
// // const props = {
// //   businessRegistrationRequest: jest.fn(() => Promise.resolve()),
// //   businessUpdateRequest: jest.fn(() => Promise.resolve()),
// //   fetchBusinessById: jest.fn(() => Promise.resolve()),
// //   fetchCategories: jest.fn(() => Promise.resolve()),
// //   fetchLocations: jest.fn(() => Promise.resolve()),
// //   isLoading: false,
// //   params: {},
// //   history,
// //   categories,
// //   locations,
// //   onChange: jest.fn(() => Promise.resolve()),
// //   onSubmit: jest.fn(() => Promise.resolve()),
// //   state: business
// // };

// const setup = () => {
//   props ={
//     match: {
//       params: {
//         id: 1
//       }
//     },
//     businessRegistrationRequest: jest.fn(() => Promise.resolve()),
//     businessUpdateRequest: jest.fn(() => Promise.resolve()),
//     fetchBusinessById: jest.fn(() => Promise.resolve()),
//     fetchCategories: jest.fn(() => Promise.resolve()),
//     fetchLocations: jest.fn(() => Promise.resolve()),
//     isLoading: false,
//     params: {},
//     history,
//     categories,
//     locations,
//     onChange: jest.fn(() => Promise.resolve()),
//     onSubmit: jest.fn(() => Promise.resolve()),
//     state: business
//   }
//   return shallow(<BusinessRegistration {...props} match={props.match} />);
// };

// const event = (name, value) => ({
//   preventDefault: jest.fn(() => Promise.resolve()),
//   target: {
//     name,
//     value
//   }
// });

// describe('Business registration component', () => {
//   it('should render registration page', () => {
//     // const wrapper = setup();
//     const props ={
//       match: {
//         params: {
//           id: 1
//         }
//       },
//       businessRegistrationRequest: jest.fn(() => Promise.resolve()),
//       businessUpdateRequest: jest.fn(() => Promise.resolve()),
//       fetchBusinessById: jest.fn(() => Promise.resolve()),
//       fetchCategories: jest.fn(() => Promise.resolve()),
//       fetchLocations: jest.fn(() => Promise.resolve()),
//       isLoading: false,
//       params: {},
//       history,
//       categories,
//       locations,
//       onChange: jest.fn(() => Promise.resolve()),
//       onSubmit: jest.fn(() => Promise.resolve()),
//       state: business
//     }
//     const wrapper = shallow(<BusinessRegistration {...props} />)
//     expect(wrapper.find('div').length).toBe(2);
//     expect(wrapper.find('RegistrationForm').length).toBe(1);
//     expect(toJSON(wrapper)).toMatchSnapshot();
//   }) 

//   it('should render registration form', () => {
//     const wrapper = shallow(<RegistrationForm {...props} />);
//     wrapper.setProps({ params: {} });
//     expect(wrapper.find('.form-header').text()).toBe('Update business');
//     expect(wrapper.find('div').length).toBe(11);
//     expect(wrapper.find('form').length).toBe(1);
//     expect(wrapper.find('button').length).toBe(1);
//     expect(wrapper.find('i').length).toBe(1);
//     expect(wrapper.find('textarea').length).toBe(1);
//     expect(wrapper.find('span').length).toBe(3);
//     expect(wrapper.find('button').simulate('click'));
//     wrapper.setProps({ isLoading: true, params: { id: 1 } });
//     expect(wrapper.find('.form-header').text()).toBe('Update business');
//     expect(wrapper.find('span').length).toBe(3);
//     expect(toJSON(wrapper)).toMatchSnapshot();

//     let state = {
//       business: null,
//       // businesses: {
//         params,
//         categories,
//         locations,
//       // },
//       isLoading: false
//     };

//     let props = {
//       match: {
//         params: {}
//       }
//     }

//     expect(mapStateToProps(state, props)).toEqual(state);
//     // expect(mapStateToProps(state, props)).toEqual(state);

//     state = {
//       business,
//       // businesses: {,
//         params,
//         categories,
//         locations,
//       // },,
//       isLoading: false
//     };

//     props = {
//       match: {
//         params: { id: 1}
//       }
//     }
//     // expect(mapStateToProps(state, props)).toEqual(state);
//     // expect(mapStateToProps(props).match).toEqual(match);
//   }) 

//   // it('should render connected registration page', () => {
//   //   props = {
//   //     match: {
//   //       params: { id: 1}
//   //     }
//   //   }
//   //   const store = mockStore({});
//   //   const wrapper = shallow(<ConnectedBusinessRegistration props={props} store={store} />);
//   //   expect(wrapper.length).toBe(1);
//   // }) 
// });

// describe('Registration onchange method', () => {
//   beforeEach(() => {
//     global.document = {
//       title: () => {}
//     }
//   });
  
  
//   it('should simulate input change', () => {
//     const wrapper = setup();
//     const RegistrationForm = wrapper.find('RegistrationForm');
    
//     RegistrationForm.simulate('change', event('name', business.name));
//     expect(wrapper.instance().state.name).toBe(business.name);

//     RegistrationForm.simulate('change', event('email', business.email));
//     expect(wrapper.instance().state.name).toBe(business.name);

//     RegistrationForm.simulate('change', event('address', business.address));
//     expect(wrapper.instance().state.name).toBe(business.name);

//     RegistrationForm.simulate('change', event('location', business.location));
//     expect(wrapper.instance().state.name).toBe(business.name);

//     RegistrationForm.simulate('change', event('category', business.category));
//     expect(wrapper.instance().state.name).toBe(business.name);

//     RegistrationForm.simulate('change', event('description', business.description));
//     expect(wrapper.instance().state.name).toBe(business.name);
//   });

//   it('should simulate password change', () => {
//     const wrapper = setup();
//     const RegistrationForm = wrapper.find('RegistrationForm');
//   });
// });

// describe('Submit function', () => {
//   it('should submit business information', () => {
//     const wrapper = setup();
//     const RegistrationForm = wrapper.find('RegistrationForm');
//     wrapper.setState(business);

//     RegistrationForm.simulate('submit', event());
//   });
// });














import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import toJSON from 'enzyme-to-json';
import ConnectedBusinessRegistration, 
  { BusinessRegistration, mapStateToProps } 
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
  // categories,
  // locations,
  onChange: jest.fn(() => Promise.resolve()),
  onSubmit: jest.fn(() => Promise.resolve()),
  state: {
    // business,
    changeValue: 11, 
    defaultTotal: 250,
    color: 'red'
  }
};
const setup = () => {
  return shallow(<BusinessRegistration {...props} />);
};

const event = (name, value) => ({
  preventDefault: jest.fn(() => Promise.resolve()),
  target: {
    name,
    value
  }
});

describe('Business registration component', () => {
  beforeEach(() => {
    global.props = {
      match: {
        params: () => {}
      }
    }
  })

  it('should render registration page', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('RegistrationForm').length).toBe(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  }) 

  it('should render registration form', () => {
    props = {
      state: {
        name: () => {}
      },
      locations: jest.fn(() => Promise.resolve()),
      categories: jest.fn(() => Promise.resolve()),
      params: {
        id: undefined
      }
    }

    let state = {
      business: null,
      // businesses: {
        params,
        categories,
        locations,
      // },
      isLoading: false,
      changeValue: 11, 
      defaultTotal: 250,
      color: 'red'
    };

    const wrapper = shallow(<RegistrationForm {...props} />);
    wrapper.setProps({ params: {} });
    expect(wrapper.find('.form-header').text()).toBe('Update business');
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

    

    let props = {
      match: {
        params: {}
      }
    }

    expect(mapStateToProps(state, props)).toEqual(state);
    // expect(mapStateToProps(state, props)).toEqual(state);

    state = {
      business,
      // businesses: {,
        params,
        categories,
        locations,
      // },,
      isLoading: false
    };

    props = {
      match: {
        params: { id: 1}
      }
    }
    // expect(mapStateToProps(state, props)).toEqual(state);
    // expect(mapStateToProps(props).match).toEqual(match);
  }) 

  it('should render connected registration page', () => {
    const businesses = {
        business,
        params,
        categories,
        locations,
      }

    const store = mockStore({businesses});
    const wrapper = shallow(<ConnectedBusinessRegistration store={store} {...props}  />);
    expect(wrapper.length).toBe(1);
  }) 
});

describe('Registration onchange method', () => {
  beforeEach(() => {
    global.document = {
      title: () => {}
    }
  });
  
  
  it('should simulate input change', () => {
    const wrapper = setup();
    const RegistrationForm = wrapper.find('RegistrationForm');
    
    RegistrationForm.simulate('change', event('name', business.name));
    expect(wrapper.instance().state.name).toBe(business.name);

    RegistrationForm.simulate('change', event('email', business.email));
    expect(wrapper.instance().state.name).toBe(business.name);

    RegistrationForm.simulate('change', event('address', business.address));
    expect(wrapper.instance().state.name).toBe(business.name);

    RegistrationForm.simulate('change', event('location', business.location));
    expect(wrapper.instance().state.name).toBe(business.name);

    RegistrationForm.simulate('change', event('category', business.category));
    expect(wrapper.instance().state.name).toBe(business.name);

    RegistrationForm.simulate('change', event('description', business.description));
    expect(wrapper.instance().state.name).toBe(business.name);
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

