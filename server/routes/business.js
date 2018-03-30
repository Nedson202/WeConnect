import Businesses from '../controller/business';
import validator from '../middlewares/validator';
import sorter from '../middlewares/business-filterer';
import errorHandler from '../middlewares/error-handler';
import checkAuth from '../middlewares/check-auth';

export default (route) => {
  route.post('/api/v1/businesses', checkAuth, validator.registerBusiness, errorHandler, Businesses.createBusiness);
  route.get('/api/v1/businesses', validator.checkQuery, errorHandler, sorter.sortQuery, Businesses.getBusiness);
  route.get('/api/v1/businesses/:businessId', Businesses.getOneBusiness);
  route.put('/api/v1/businesses/:businessId', checkAuth, sorter.checkBusiness, Businesses.updateBusiness);
  route.delete('/api/v1/businesses/:businessId', checkAuth, sorter.checkBusiness, Businesses.deleteBusiness);
};
