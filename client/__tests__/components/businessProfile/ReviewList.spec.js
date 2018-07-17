import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import ReviewList from '../../../components/business-profile/ReviewList';
import businessData from '../../__mockData__/business';
import userData from '../../__mockData__/userData';

const { business, reviews, review, paginationResult} = businessData;
const { userUpdateData } = userData;
configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    onChange: jest.fn(),
    onStarClick: jest.fn(),
    onSubmit: jest.fn(),
    fetchReviews: jest.fn(),
    deleteReview: jest.fn(),
    deleteStatus: jest.fn(),
    onReviewDelete: jest.fn(),
    onReviewUpdate: jest.fn(),
    onReviewPageChange: jest.fn(),
    fetchBusinessById: jest.fn(),
    reviewUpdateRequest: jest.fn(),
    edit: jest.fn(),
    cancelEdit: jest.fn(),
    edit: jest.fn(),
    state: review,
    user: userUpdateData,
    params: {},
    reviews,
    paginate: paginationResult
  };

  return shallow(<ReviewList {...props} />);
};


describe('Component: ReviewList', () => {
  beforeEach(() => {
    global.window = {
      window: () => {},
    }
  })

  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('Pagination').length).toBe(1);
    expect(wrapper.find('Pagination').props().defaultPageSize).toBe(6);
    expect(wrapper.length).toBe(1);
    wrapper.setProps({ paginate: {}, reviews: [] });
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('Pagination').length).toBe(0);
    wrapper.setProps({ paginate: {
      totalReviews: 3,
      limit: 5
    }, reviews: [] });
    expect(wrapper.find('div').length).toBe(2);
    wrapper.setProps({ paginate: {
      totalReviews: undefined,
      limit: 5
    }, reviews: [] });
    expect(wrapper.find('Pagination').length).toBe(0);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});