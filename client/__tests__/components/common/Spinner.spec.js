import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import Spinner from '../../../components/common/Spinner';

configure({ adapter: new Adapter() });

let props;

const setup = () => {
  props = {
    isLoading: false,
  }

  return shallow(<Spinner {...props} />);
};

describe('Component: Spinner', () => {
  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  }) 
});