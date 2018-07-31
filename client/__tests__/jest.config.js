import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

let window;
const event = (name, value) => ({
  preventDefault: jest.fn(),
  target: {
    name,
    value,
    files: [{
      type: ''
    }]
  }
});

const history = {
  push: () => {}
}

global.event = event;

global.toastr = {
  error: jest.fn()
};

const props = { 
  history: [],
  match: {
    params: () => {}
  },
  state: {
    businesses: {
      business: () => {},
      categories: () => {}
    }
  }
 };
global.props = props;

global.window = window;
const params = {};

global.localStorage = localStorage;
global.shallow = shallow;
global.mount = mount;
global.history = history;
global.params = params;
global.token =
// eslint-disable-next-line
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWxhbiIsImVtYWlsIjoiY29AZmtzLmNvbSIsImlhdCI6MTUyNjc3NDY4NX0.-ifQEPBdNquBQylvLQGvEPz1UHJTYzlTJJa3O9r1yVE';

configure({ adapter: new Adapter() });