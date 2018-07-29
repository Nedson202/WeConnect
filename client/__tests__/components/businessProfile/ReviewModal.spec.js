import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import ReviewModal from '../../../components/business-profile/ReviewModal';
import businessData from '../../__mockData__/business';
import userData from '../../__mockData__/userData';

const { business, review, businessOwner } = businessData;
const { userUpdateData } = userData;
configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    onChange: jest.fn(() => Promise.resolve()),
    onStarClick: jest.fn(() => Promise.resolve()),
    onSubmit: jest.fn(() => Promise.resolve()),
    state: {
      message: review.message,
      rating: review.rating,
      isLoading: false
    },
    user: userUpdateData,
    business
  };

  return shallow(<ReviewModal {...props} />);
};


describe('Component: ReviewModal', () => {
  beforeEach(() => {
    global.window = {
      window: () => {},
    };
  });

  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(2);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });

  it('should render form if reviewer is not the business owner', () => {
    const wrapper = setup();
    wrapper.setProps({ business: businessOwner });
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('textarea').length).toBe(1);
    expect(wrapper.find('ReactStars').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });
});