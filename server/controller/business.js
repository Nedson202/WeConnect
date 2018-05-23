import models from '../models/index';
import errorMessage from '../middlewares/error-message';

const Businesses = models.Business;
const Users = models.User;
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
      category,
      description
    } = req.body;

    const conflict = {};

    if (req.decoded.username === 'admin') {
      return res.status(403).json({
        message: 'An admin can not register a business',
        error: true
      });
    }

    return Businesses.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      address: address.toLowerCase(),
      location: location.toLowerCase(),
      category: category.toLowerCase(),
      description: description.toLowerCase(),
      userId: req.decoded.userId
    })
      .then(business => {
        return res.status(201).json({
          message: 'Business registration successful',
          error: false,
          business
        })
      })
      .catch((error) => {
        if(error) {
          conflict.businessname = 'Business with name is already registered';
          res.status(409).json(conflict);
        }           
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
      .findAll({
        include: [{
          model: Users,
          as: 'businessOwner',
          attributes: ['username']
        }]
      })
      .then((businesses) => {
        if (businesses.length === 0) {
          return res.status(200).json({ businesses });
        }
        return res.status(200).json({ businesses });
      });
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
          business: [business],
          error: false
        });
      })
      .catch(error => res.status(500).json({
        message: error.message,
        help: 'No space, only an integer is allowed',
        error: true
      }));
  }
  /**
          *
          *@param {any} req - request value
          *@param {any} res - response value
          *@return {json} response object gotten
          *@memberof BusinessMethods
        */
  static getBusinessByUserId(req, res) {
    const { userId } = req.params;
    return Businesses.findAll({
      where: {
        userId
      }
    })
      .then((businesses) => {
        if (businesses === null) {
          return errorMessage(res);
        }

        return res.status(200).json({ businesses });
      })
      .catch(error => res.status(500).json({
        message: error.message,
        help: 'No space, only an integer is allowed',
        error: true
      }));
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {json} response object gotten
    *@memberof BusinessMethods
  */
  static updateBusiness(req, res) {
    const conflict = {};

    const businessId = parseInt(req.params.businessId, 10);
    return Businesses.findById(businessId)
      .then((business) => {
        if (business.userId !== req.decoded.userId) {
          return res.status(403).json({
            message: 'Forbidden, you do not have access to modify this business',
            error: true
          });
        }

        business.update({
          name: req.body.name || business.name,
          email: req.body.email || business.email,
          address: req.body.address || business.address,
          location: req.body.location || business.location,
          category: req.body.category || business.category,
          description: req.body.description || business.description,
          image: req.body.image || business.dimage,
        })
          .then(() => res.status(200).json({
            message: 'Business updated successfully',
            error: false,
            business
          }))
          .catch((error) => {
            if (error.errors[0].path === 'name') {
              conflict.businessname = 'Business with name is already registered';
            }

            return res.status(409).json(conflict);
          });
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
    return Businesses.findOne({
      where: {
        id: businessId
      }
    }).then((business) => {
      if (req.decoded.username === 'admin' || business.userId === req.decoded.userId) {
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
      return res.status(403).json({
        message: 'Forbidden, you do not have access to modify this business',
        error: true
      });
    });
  }
}

export default BusinessMethods;
