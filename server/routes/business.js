import Businesses from '../controller/business';
import Categories from '../controller/category';
import Locations from '../controller/location';
import validator from '../middlewares/validator';
import sorter from '../middlewares/business-filterer';
import checkAuth from '../middlewares/check-auth';

export default (route) => {
  route.post('/api/v1/businesses', checkAuth, validator.registerBusiness, Businesses.createBusiness);
  route.get('/api/v1/businesses', validator.checkQuery, sorter.sortQuery, Businesses.getBusiness);
  route.get('/api/v1/categories', Categories.getCategories);
  route.get('/api/v1/locations', Locations.getLocations);
  route.get('/api/v1/businesses/:businessId', Businesses.getOneBusiness);
  route.get('/api/v1/businesses/user/:userId', Businesses.getBusinessByUserId);
  route.put('/api/v1/businesses/:businessId', checkAuth, sorter.checkBusiness, validator.registerBusiness, Businesses.updateBusiness);
  route.delete('/api/v1/businesses/:businessId', checkAuth, sorter.checkBusiness, Businesses.deleteBusiness);
};
