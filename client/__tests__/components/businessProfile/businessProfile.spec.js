import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import connectedBusinessProfile, { BusinessProfile } from '../../../components/business-profile/BusinessProfile';
import businessData from '../../__mockData__/business';
import userData from '../../__mockData__/userData';
import { mapStateToProps } from '../../../components/business-profile/BusinessProfile';

const { business, reviews, review, paginationResult} = businessData;
const { userUpdateData } = userData;
configure({ adapter: new Adapter() });

let props, store, match;
const setup = () => {
  props = {
    onChange: jest.fn(() => Promise.resolve()),
    reviewRequest: jest.fn(() => Promise.resolve()),
    deleteBusiness: jest.fn(() => Promise.resolve()),
    businessImageUploader: jest.fn(() => Promise.resolve()),
    uploadToCloudinary: jest.fn(() => Promise.resolve()),
    onStarClick: jest.fn(() => Promise.resolve()),
    onSubmit: jest.fn(() => Promise.resolve()),
    fetchReviews: jest.fn(() => Promise.resolve()),
    deleteReview: jest.fn(() => Promise.resolve()),
    deleteStatus: jest.fn(() => Promise.resolve()),
    onReviewDelete: jest.fn(() => Promise.resolve()),
    onReviewUpdate: jest.fn(() => Promise.resolve()),
    onReviewPageChange: jest.fn(() => Promise.resolve()),
    fetchBusinessById: jest.fn(() => Promise.resolve()),
    reviewUpdateRequest: jest.fn(() => Promise.resolve()),
    edit: jest.fn(() => Promise.resolve()),
    cancelEdit: jest.fn(() => Promise.resolve()),
    edit: jest.fn(() => Promise.resolve()),
    state: review,
    user: userUpdateData,
    match: {
      params: {
        id: 1
      }
    },
    params: {
      id: 1
    },
    reviews,
    paginate: paginationResult,
    loader: jest.fn(() => Promise.resolve()),
    business,
    isLoading: false,
    image: {image:'path/to/image'},
    history: {}
  };

  return shallow(<BusinessProfile {...props} />);
};


describe('Component: BusinessProfile', () => {
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
    expect(wrapper.find('div').length).toBe(13);
    expect(wrapper.find('h4').length).toBe(3);
    expect(wrapper.find('p').length).toBe(4);
    expect(wrapper.find('span').length).toBe(4);
    expect(wrapper.find('ReactStars').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('ImageZoom').length).toBe(1);
    expect(wrapper.find('BusinessImageUpload').length).toBe(1);
    expect(wrapper.length).toBe(1);
    // expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('ReviewModal').length).toBe(1);
    expect(wrapper.find('ReviewList').length).toBe(0);
    wrapper.setProps({ user: {}, reviews: ['good'] });
    expect(wrapper.find('ReviewList').length).toBe(0);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('Component: BusinessProfile ComponentDidMount', () => {
  it('should get a business', () => {
    const spy = sinon.spy(BusinessProfile.prototype, 'componentDidMount');
    shallow(<BusinessProfile {...props} componentDidMount={spy}/>)
      .instance().componentDidMount({ setState: () => 1 });
  });
});

describe('Component: BusinessProfile ComponentDidMount', () => {
  it('should render connected component', () => {
    const wrapper = shallow(<connectedBusinessProfile store={store} />);
    expect(wrapper.length).toBe(1);
  }) 
});

describe('Component: BusinessProfile mapStateToProps', () => {
  beforeEach(() => {
    global.props = {
      match: {
        params: () => {}
      }
    }
    global.match = {
      match: () => {}
    }
  })

  // it('should check mapStateToProps', () => {
  //   const state = {
  //     businesses: {
  //       reviews,
  //       paginationResult
  //     },
  //     auth: userUpdateData,
  //     isLoading: false,
  //     image: ''
  //   };
  //   expect(mapStateToProps(state).businesses).toEqual(state);
  // }) 
});