import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';

configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    onImageChange: jest.fn(() => Promise.resolve()),
    onImageSubmit: jest.fn(() => Promise.resolve()),
    state: {
      uploading: false,
    },
  };

  return shallow(<ImageUpload {...props} />);
};

const event = {
  preventDefault: jest.fn()
};

describe('Component: BusinessImageUpload', () => {
  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(6);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('Component: BusinessImageUpload', () => {
  it('should render upload progress', () => {

  props = {
    onImageChange: jest.fn(() => Promise.resolve()),
    onImageSubmit: jest.fn(() => Promise.resolve()),
    state: {
      uploading: true,
    },
  };

    const wrapper = shallow(<ImageUpload {...props} />);
    expect(wrapper.find('div').length).toBe(8);
    expect(wrapper.find('#progress').length).toBe(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});