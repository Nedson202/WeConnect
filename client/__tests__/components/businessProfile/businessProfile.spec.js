import React from 'react';
import { configure, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import connectedBusinessProfile, { BusinessProfile } from '../../../components/business-profile/BusinessProfile';
import businessData from '../../__mockData__/business';
import userData from '../../__mockData__/userData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const {
  business, reviews, review, paginationResult
} = businessData;
const { userUpdateData } = userData;
configure({ adapter: new Adapter() });

let props;
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
    image: { image: 'path/to/image' },
    history: {}
  };

  return shallow(<BusinessProfile {...props} />);
};

const event = {
  preventDefault: jest.fn()
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
    };
    global.match = {
      params: () => {}
    };
  });

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
    expect(wrapper.find('ReviewModal').length).toBe(1);
    expect(wrapper.find('ReviewList').length).toBe(0);
    wrapper.setProps({ user: {}, reviews: ['good'], business });
    expect(wrapper.find('ReviewList').length).toBe(0);
    wrapper.setProps({ business: {} });
    expect(wrapper.find('h3').length).toBe(1);
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('Spinner').length).toBe(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('state to props', () => {
  props = {
    match: {
      params: { id: 1 }
    },
  };

  it('should render connected registration page', () => {
    const businesses = {
      reviews,
      business,
      paginationResult
    };

    const auth = {
      user: userUpdateData
    };

    const store = mockStore({
      businesses,
      isLoading: false,
      auth,
      image: '/psth/to/image',
      params: props
    });
    const wrapper = shallow(<connectedBusinessProfile store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('Function test', () => {
  beforeEach(() => {
    global.toastr = {
      error: () => {}
    };
  });

  it('should call imageChange function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const imageChange = jest.spyOn(wrapper.instance(), 'onImageChange');
    action.onImageChange({ target: { files: ['1'] } });
    expect(imageChange).toBeCalled();
  });

  it('should call onImageSubmit function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const onImageSubmit = jest.spyOn(wrapper.instance(), 'onImageSubmit');
    action.onImageSubmit(event);
    expect(onImageSubmit).toBeCalled();
  });

  it('should call onStarClick function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const starClick = jest.spyOn(wrapper.instance(), 'onStarClick');
    action.onStarClick({ target: { files: ['1'] } });
    expect(starClick).toBeCalled();
  });

  it('should call onReviewDelete function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const onReviewDelete = jest.spyOn(wrapper.instance(), 'onReviewDelete');
    action.onReviewDelete(1);
    expect(onReviewDelete).toBeCalled();
  });

  it('should call onBusinessDelete function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const onBusinessDelete = jest.spyOn(wrapper.instance(), 'onBusinessDelete');
    action.onBusinessDelete(event);
    expect(onBusinessDelete).toBeCalled();
  });

  it('should call onReviewPageChange function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const onReviewPageChange = jest.spyOn(wrapper.instance(), 'onReviewPageChange');
    action.onReviewPageChange(1);
    expect(onReviewPageChange).toBeCalled();
  });

  it('should call onReviewUpdate function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const onReviewUpdate = jest.spyOn(wrapper.instance(), 'onReviewUpdate');
    action.onReviewUpdate(1);
    expect(onReviewUpdate).toBeCalled();
  });

  it('should call cancelEdit function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const cancelEdit = jest.spyOn(wrapper.instance(), 'cancelEdit');
    action.cancelEdit(1);
    expect(cancelEdit).toBeCalled();
  });

  it('should call deleteStatus function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const deleteStatus = jest.spyOn(wrapper.instance(), 'deleteStatus');
    action.deleteStatus(1);
    expect(deleteStatus).toBeCalled();
  });

  it('should call edit function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const edit = jest.spyOn(wrapper.instance(), 'edit');
    action.edit(1);
    expect(edit).toBeCalled();
  });

  it('should call imageGenerator function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const imageGenerator = jest.spyOn(wrapper.instance(), 'imageGenerator');
    action.imageGenerator();
    wrapper.setProps({ business: {} });
    expect(imageGenerator).toBeCalled();
  });
});

describe('Review onchange method', () => {
  beforeEach(() => {
    global.document = {
      title: () => {}
    };
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
    const ReviewForm = wrapper.find('ReviewModal');

    ReviewForm.simulate('change', event('message', review.message));
    expect(wrapper.instance().state.message).toBe(review.message);

    ReviewForm.simulate('change', event('rating', review.rating));
    expect(wrapper.instance().state.rating).toBe(review.rating);
  });
});

describe('Submit function', () => {
  it('should submit review', () => {
    const wrapper = setup();
    const ReviewForm = wrapper.find('ReviewModal');
    wrapper.setState(review);

    ReviewForm.simulate('submit', event);
  });
});