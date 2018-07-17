import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import Textfield from '../../../components/common/TextField';

configure({ adapter: new Adapter() });

let props;

const setup = () => {
  props = {
    field: 'username',
    value: 'username',
    label: 'Username',
    placeholder: 'Do this',
    type: 'text',
    onChange: jest.fn(),
    id: 'username'
  }

  return shallow(<Textfield {...props} />);
};

describe('Component: Textfield', () => {
  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(2);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.length).toBe(1);
  }) 
});