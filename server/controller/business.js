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

    Categories.findById(parseInt(category.replace(/[^0-9]/g, ''), 10))
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
      }))
      .catch(error => res.status(400).json(error));
  }
  /**
          *
          *@param {any} req - request value
          *@param {any} res - response value
          *@return {json} response object gotten
          *@memberof filterBusiness
        */
  static getOneBusiness(req, res) {
    Businesses.findById(req.params.businessId)
      .then((business) => {
        if (business === null) {
          errorMessage(res);
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
    *@memberof Businesses
  */
  static updateBusiness(req, res) {
    Businesses.findById(req.params.businessId)
      .then((business) => {
        if (!business) {
          errorMessage(res);
        }

        if (business.userId !== checkAuth(req, res).userId) {
          return res.status(403).json({
            message: 'Sorry, you do not have write access to this business',
            error: true
          });
        }

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
    *@memberof Businesses
  */
  static deleteBusiness(req, res) {
    Businesses.findById(req.params.businessId)
      .then((business) => {
        if (!business) {
          errorMessage(res);
        }

        if (business.userId !== checkAuth(req, res).userId) {
          return res.status(403).json({
            message: 'Unable to delete, you do not have access to modify this business',
            error: true
          });
        }

        Businesses.destroy({
          where: {
            id: req.params.businessId
          }
        })
          .then(() => res.status(200).json({
            message: 'Business deleted successfully',
            error: false
          }));
      });
  }
}

export default BusinessMethods;
