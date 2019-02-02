import Businesses from '../controller/business';
import Categories from '../controller/category';
import Locations from '../controller/location';
import validator from '../middlewares/validator';
import errorHandler from '../middlewares/error-handler';
import sorter from '../middlewares/business-filterer';
import checkAuth from '../middlewares/check-auth';
import HealthChecker from '../controller/healthChecker';
// all endpoints related to businesses
export default (route) => {
  route.post('/api/v1/businesses', checkAuth, validator.registerBusiness, errorHandler, Businesses.createBusiness);
  route.get('/api/v1/businesses', validator.checkQuery, sorter.sortQuery, Businesses.getBusiness);
  route.get('/api/v1/healthCheck', HealthChecker.getServerHealth);
  route.get('/api/v1/categories', Categories.getCategories);
  route.get('/api/v1/locations', Locations.getLocations);
  route.get('/api/v1/businesses/:businessId', Businesses.getOneBusiness);
  route.get('/api/v1/businesses/user/:userId', Businesses.getBusinessByUserId);
  route.put('/api/v1/businesses/:businessId', checkAuth, sorter.checkBusiness, validator.registerBusiness, errorHandler, Businesses.updateBusiness);
  route.put('/api/v1/business/:businessId/image', checkAuth, sorter.checkBusiness, Businesses.updateBusinessImage);
  route.delete('/api/v1/businesses/:businessId', checkAuth, sorter.checkBusiness, Businesses.deleteBusiness);
};
