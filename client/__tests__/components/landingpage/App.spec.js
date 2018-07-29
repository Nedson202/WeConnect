import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import App from '../../../components/landingPage/App';

configure({ adapter: new Adapter() });

describe('Component: App', () => {
  beforeEach(() => {
    global.document = {
      title: () => {}
    }
  })

  it('should render', () => {
  const wrapper = shallow(<App />);
    expect(wrapper.find('div').length).toBe(2);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  }) 
});