import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import Review from '../../../components/business-profile/Review';
import businessData from '../../__mockData__/business';

const { review } = businessData;
configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    onChange: jest.fn(() => Promise.resolve()),
    onStarClick: jest.fn(() => Promise.resolve()),
    fetchReviews: jest.fn(() => Promise.resolve()),
    onReviewDelete: jest.fn(() => Promise.resolve()),
    onReviewUpdate: jest.fn(() => Promise.resolve()),
    fetchBusinessById: jest.fn(() => Promise.resolve()),
    reviewUpdateRequest: jest.fn(() => Promise.resolve()),
    edit: jest.fn(() => Promise.resolve()),
    cancelEdit: jest.fn(() => Promise.resolve()),
    deleteStatus: jest.fn(() => Promise.resolve()),
    state: {
      review,
      editStatus: true
    },
    review: {
      id: null,
      reviewer: {
        username: 'allen',
        image: '/path/to/image'
      }
    },
    params: {},
    username: 'mike',
    reviewId: 1,
  };

  return shallow(<Review {...props} />);
};


describe('Component: Review', () => {
  beforeEach(() => {
    global.window = {
      window: () => {},
    };
    global.reviewer = {
      image: () => ''
    };
  })

  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(8);
    expect(wrapper.find('ImageZoom').length).toBe(1);
    expect(wrapper.find('button').length).toBe(2);
    // expect(wrapper.find('EditReview').length).toBe(1);
    wrapper.setProps({
      review: {
        reviewer: {
          username: 'allen',
        }
      }, 
      username: 'allen',
    });
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('button').length).toBe(4);
    expect(wrapper.find('div').length).toBe(9);
    expect(wrapper.find('span').length).toBe(1);
    wrapper.setProps({
      review: {
        id: 1,
        reviewer: {
          username: 'allen',
        }
      }, 
      username: 'allen',
      state: {
        review,
        editStatus: 1
      },
    });
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('span').length).toBe(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('Function test', () => {
  it('should call imageChange function', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const displayButtons = jest.spyOn(wrapper.instance(), 'displayButtons');
    action.displayButtons();
    expect(displayButtons).toBeCalled();
  });
});