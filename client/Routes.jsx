import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './components/App';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import AllBusiness from './components/AllBusiness';
import Dashboard from './components/Dashboard';
import BusinessRegistration from './components/business-registration/BusinessRegistration';
import AdminPanel from './components/AdminPanel';
import SearchResultPage from './components/search/SearchResultPage';
import BusinessProfile from './components/business-profile/BusinessProfile';
import requireAuth from './utils/requireAuth';
import requireAdminAuth from './utils/requireAdminAuth';
import NotFound from './components/NotFound';
import FlashMessages from './components/flash/FlashMessages';

const Routes = () => (
  <div>
    <Navbar />
    <FlashMessages />
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/signup" component={Signup} exact />
      <Route path="/businesses" component={AllBusiness} exact />
      <Route path="/dashboard" component={requireAuth(Dashboard)} exact />
      <Route path="/registerbusiness" component={requireAuth(BusinessRegistration)} exact />
      <Route path="/updatebusiness/:id" component={requireAuth(BusinessRegistration)} exact />
      <Route path="/adminpanel" component={requireAdminAuth(AdminPanel)} exact />
      <Route path="/searchresult" component={SearchResultPage} exact />
      <Route path="/profile/:id" component={BusinessProfile} />
      <Route component={NotFound} />        
    </Switch>
    <Footer />      
  </div>
);

export default Routes;
