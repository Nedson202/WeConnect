import models from '../models/index';
import errorMessage from '../middlewares/error-message';
import regex from '../middlewares/regex';
import checkAuth from '../middlewares/check-auth';

const Businesses = models.Business;
const Categories = models.Category;
/**

 *@class
 *
 */
class BusinessMethods {
  /**
      *
      *@param {any} req - request value
      *@param {any} res - response value
      *@return {json} response object gotten
      *@memberof BusinessMethods
    */
  static createBusiness(req, res) {
    const {
      name,
      email,
      address,
      location,
      category
    } = req.body;

    checkAuth(req, res);
    regex(res, category);

    return Categories.findById(parseInt(category.replace(/[^0-9]/g, ''), 10))
      .then((businessCategory) => {
        if (businessCategory === null) {
          return res.status(404).json({
            message: 'Business with category provided is not available yet',
            help: 'Register under 8 instead which is others',
            error: true
          });
        }

        Businesses.create({
          name: name.toLowerCase(),
          email: email.toLowerCase(),
          address: address.toLowerCase(),
          location: location.toLowerCase(),
          category: businessCategory.category,
          categoryId: businessCategory.id,
          userId: checkAuth(req, res).userId
        })
          .then(business => res.status(201).json({
            message: 'Business registration successful',
            error: false,
            businessId: business.id
          }))
          .catch(error => res.status(409).json({
            message: error.errors[0].message,
            error: true
          }));
      });
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {json} response object gotten
    *@memberof BusinessMethods
  */
  static getBusiness(req, res) {
    return Businesses
      .findAll()
      .then(businesses => res.status(200).json({
        businesses,
        error: 'false'
      }));
  }
  /**
          *
          *@param {any} req - request value
          *@param {any} res - response value
          *@return {json} response object gotten
          *@memberof BusinessMethods
        */
  static getOneBusiness(req, res) {
    return Businesses.findById(req.params.businessId)
      .then((business) => {
        if (business === null) {
          return errorMessage(res);
        }

        return res.status(200).json({
          business,
          error: 'false'
        });
      });
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {json} response object gotten
    *@memberof BusinessMethods
  */
  static updateBusiness(req, res) {
    return Businesses.findById(req.params.businessId)
      .then((business) => {
        business.update({
          name: req.body.name || business.name,
          email: req.body.email || business.email,
          address: req.body.address || business.address,
          location: req.body.location || business.location,
          category: req.body.category || business.category
        })
          .then(() => res.status(200).json({
            message: 'Business updated successfully',
            error: 'false'
          }));
      });
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {status} response object gotten
    *@memberof BusinessMethods
  */
  static deleteBusiness(req, res) {
    const businessId = parseInt(req.params.businessId, 10);
    return Businesses.destroy({
      where: {
        id: businessId
      }
    })
      .then(() => res.status(200).json({
        message: 'Business deleted successfully',
        error: false
      }));
  }
}

export default BusinessMethods;
