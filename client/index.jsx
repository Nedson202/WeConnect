import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jsonwebtoken';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer'
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/loginActions';
import Routes from './Routes';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

const store = createStore(
  rootReducer,
  enhancer
);

if (localStorage.accessToken) {
  setAuthToken(localStorage.accessToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.accessToken)));
}

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));

module.hot.accept();
