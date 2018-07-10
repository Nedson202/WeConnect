import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './components/landingPage/App';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import AllBusiness from './components/businessListings/AllBusiness';
import Dashboard from './components/dashboard/Dashboard';
import BusinessRegistration from './components/business-registration/BusinessRegistration';
import AdminPanel from './components/adminPanel/AdminPanel';
import SearchResultPage from './components/search/SearchResultPage';
import BusinessProfile from './components/business-profile/BusinessProfile';
import requireAuth from './utils/hoc/requireAuth';
import requireAdminAuth from './utils/hoc/requireAdminAuth';
import NotFound from './components/common/NotFound';
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
