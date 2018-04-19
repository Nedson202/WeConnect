import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jsonwebtoken';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './components/App.jsx';
import Login from './components/login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
import AllBusiness from './components/AllBusiness.jsx';
import Dashboard from './components/Dashboard.jsx';
import BusinessRegistration from './components/business-registration/BusinessRegistration.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import SearchResultPage from './components/search/SearchResultPage.jsx';
import BusinessProfile from './components/business-profile/BusinessProfile.jsx';
import rootReducer from './rootReducer'
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/loginActions';
import requireAuth from './utils/requireAuth';
import requireAdminAuth from './utils/requireAdminAuth';

// const store = createStore(
//   (state = {}) => state,
//   applyMiddleware(thunk)
// );

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
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
      <div>
        <Route path="/" component={App} exact={true}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/businesses" component={AllBusiness}/>
        <Route path="/dashboard" component={requireAuth(Dashboard)}/>
        <Route path="/registerbusiness" component={requireAuth(BusinessRegistration)} exact={true}/>
        <Route path="/registerbusiness/:id" component={requireAuth(BusinessRegistration)} exact={true}/>
        <Route path="/adminpanel" component={requireAdminAuth(AdminPanel)}/>
        <Route path="/searchresult" component={SearchResultPage}/>
        <Route path="/profile/:id" component={BusinessProfile}/>
      </div>
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));

module.hot.accept();
