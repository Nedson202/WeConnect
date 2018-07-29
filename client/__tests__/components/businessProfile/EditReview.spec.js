import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import EditReview from '../../../components/business-profile/EditReview';
import businessData from '../../__mockData__/business';
import userData from '../../__mockData__/userData';

const { business, review } = businessData;
const { userUpdateData } = userData;
configure({ adapter: new Adapter() });

let props;
props = {
  onChange: jest.fn(() => Promise.resolve()),
  onStarClick: jest.fn(() => Promise.resolve()),
  onSubmit: jest.fn(() => Promise.resolve()),
  onReviewUpdate: jest.fn(() => Promise.resolve()),
  cancelEdit: jest.fn(() => Promise.resolve()),
  state: {
    message: review.message,
    rating: review.rating,
    isLoading: false
  },
  user: userUpdateData,
  business,
  reviewId: 1
};
const setup = () => shallow(<EditReview {...props} />);

describe('Component: EditReview when isLoading is false', () => {
  beforeEach(() => {
    global.window = {
      window: () => {},
    };
  });

  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.find('span').length).toBe(2);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });
});

describe('Component: EditReview when isLoading is true', () => {
  beforeEach(() => {
    global.window = {
      window: () => {},
    };
  });

  it('should render', () => {
    props = {
      onChange: jest.fn(() => Promise.resolve()),
      onStarClick: jest.fn(() => Promise.resolve()),
      onSubmit: jest.fn(() => Promise.resolve()),
      onReviewUpdate: jest.fn(() => Promise.resolve()),
      state: {
        message: review.message,
        rating: review.rating,
        isLoading: true
      },
      user: userUpdateData,
      business
    };

    const wrapper = setup();
    expect(wrapper.find('i').length).toBe(1);
  });
});

describe('Submit function', () => {
  it('should submit business information', () => {
    const wrapper = setup();
    const updateButton = wrapper.find('#update-review');

    updateButton.simulate('click');
  });
});