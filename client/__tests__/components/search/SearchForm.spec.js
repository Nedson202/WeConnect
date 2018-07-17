import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import SearchForm from '../../../components/search/SearchForm';
import data from '../../__mockData__/userData';

configure({ adapter: new Adapter() });
const { searchState } = data;
let props;
const setup = () => {
  props = {
    state: searchState,
    onChange: jest.fn(),
    onSubmit: jest.fn()
  };

  return shallow(<SearchForm {...props} />);
};


describe('Component: SearchForm', () => {
  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('select').length).toBe(1);
    expect(wrapper.find('span').length).toBe(0);
    expect(wrapper.find('i').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('.search-button').simulate('click'));
    expect(wrapper.length).toBe(1);
    const state = {
      query: 'query',
      option: 'option',
      isLoading: true
    }
    wrapper.setProps({ state });
    expect(wrapper.find('span').length).toBe(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  }) 
});