import models from '../models';
import errorMessage from '../middlewares/error-message';
import config from '../config/config';

const Businesses = models.Business;
const Reviews = models.Review;
/**
 *@class
 */
class BusinessMethods {
  /**
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
    const { username, userId } = req.decoded;
    // check if user is an admin
    if (username === config.admin) {
      return res.status(403).json({
        message: 'An admin can not register a business',
        error: true
      });
    }
    // create business
    return Businesses.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      address: address.toLowerCase(),
      location: location.toLowerCase(),
      category: category.toLowerCase(),
      description: description.toLowerCase(),
      userId
    })
    // return success message and details of business created
      .then(business => res.status(201).json({
        message: 'Business registration successful',
        error: false,
        business
      }))
      // catch error caused by duplicate registration
      .catch(error => res.status(409).json([error.errors[0].message]));
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {json} response object gotten
    *@memberof BusinessMethods
  */
  static getBusiness(req, res) {
    const limit = 6;
    let page = req.query.page || 1;
    const offset = limit * (page - 1);
    page = parseInt(page, 10);
    // find all businesses and display them in batches using ?page={number}
    return Businesses
      .findAndCountAll({
        limit,
        offset,
      })
      .then((businesses) => {
        // return empty array if no business is found
        if (businesses.rows.length === 0) {
          return res.status(200).json({ businesses: businesses.rows });
        }
        const { count } = businesses;
        // generate the total number of pages that the business found will span
        const totalPages = Math.ceil(count / limit);
        // return business data and information regarding pagination of result
        return res.status(200).json({
          allData: {
            businesses: businesses.rows,
            paginateResult: {
              limit,
              totalPages,
              totalBusinesses: count,
              page,
              BusinessOnPage: businesses.rows.length
            }
          }
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
  static getOneBusiness(req, res) {
    const { businessId } = req.params;
    // return a single business. This search is done using the business id
    return Businesses.findOne({
      where: {
        id: businessId
      },
      include: [{
        model: Reviews,
        as: 'businessReviews',
        attributes: ['rating']
      }]
    })
      .then((business) => {
        // return message if no business is found. errorMessage is a reusable function
        if (business === null) {
          return errorMessage(res);
        }
        const { businessReviews } = business;
        // count the ratings in the reviews table
        const lengthOfRating = business.businessReviews.length;
        // generate the average of all rating
        const averageRating = businessReviews.reduce((totalRating, value) => totalRating + value.rating, 0) / lengthOfRating; // eslint-disable-line max-len
        // append average rating to business found
        const oneBusiness = {
          id: business.id,
          name: business.name,
          email: business.email,
          address: business.address,
          location: business.location,
          category: business.category,
          description: business.description,
          image: business.image,
          createdAt: business.createdAt,
          updatedAt: business.updatedAt,
          userId: business.userId,
          averageRating: averageRating || 0,
        };
        // return the data for business found
        return res.status(200).json({
          business: oneBusiness,
          error: false
        });
      })
      // catch error which occurs on the server
      .catch(error => res.status(500).json({
        message: error.message,
        error: true
      }));
  }
  /**
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {json} response object gotten
    *@memberof BusinessMethods
  */
  static getBusinessByUserId(req, res) {
    const limit = 6;
    let page = req.query.page || 1;
    const offset = limit * (page - 1);
    page = parseInt(page, 10);
    const { userId } = req.params;
    // find all business owned by a user
    return Businesses.findAndCountAll({
      where: {
        userId: parseInt(userId, 10)
      },
      limit,
      offset,
    })
      .then((businesses) => {
        // return empty array if no business is found
        if (businesses.rows.length === 0) {
          return res.status(200).json({ businesses: businesses.rows });
        }
        const { count } = businesses;
        // generate the total number of pages that the business found will span
        const totalPages = Math.ceil(count / limit);
        // return business data and information regarding pagination of result
        return res.status(200).json({
          allData: {
            businesses: businesses.rows,
            paginateResult: {
              limit,
              totalPages,
              totalBusinesses: count,
              page,
              BusinessOnPage: businesses.rows.length
            }
          }
        });
      })
      // catch error which occurs on the server
      .catch(error => res.status(500).json({
        message: error.message,
        error: true
      }));
  }
  /**
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {json} response object gotten
    *@memberof BusinessMethods
  */
  static updateBusiness(req, res) {
    const { business } = req;
    const {
      name, email, address, location, category, description, image
    } = req.body;
    // upddate business information
    business.update({
      name: name || business.name,
      email: email || business.email,
      address: address || business.address,
      location: location || business.location,
      category: category || business.category,
      description: description || business.description,
      image: image || business.image,
    })
      // return success message and updated business information
      .then(() => { // eslint-disable-line arrow-body-style
        return res.status(200).json({
          message: 'Business updated successfully',
          error: false,
          business
        });
      })
      // catch error which occurs on the server
      .catch(error => res.status(409).json([error.errors[0].message]));
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {json} response object gotten
    *@memberof BusinessMethods
  */
  static updateBusinessImage(req, res) {
    const { business } = req;
    // upddate business image
    business.update({
      image: req.body.image || business.image,
    })
    // return success message and updated business information
      .then(() => { // eslint-disable-line arrow-body-style
        return res.status(200).json({
          message: 'Image uploaded successfully',
          error: false,
          business
        });
      });
  }
  /**
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {status} response object gotten
    *@memberof BusinessMethods
  */
  static deleteBusiness(req, res) {
    const businessId = parseInt(req.params.businessId, 10);
    const { username, userId } = req.decoded;
    // find a business by its id
    return Businesses.findOne({
      where: {
        id: businessId
      }
    }).then((business) => {
      // delete business if it is an admin or the business owner
      if (username === config.admin || business.userId === userId) {
        return Businesses.destroy({
          where: {
            id: businessId
          }
        })
          // return success message for business deleted
          .then(() => res.status(200).json({
            message: 'Business deleted successfully',
            error: false
          }));
      }

      // return res.status(403).json({
      //   message: 'Forbidden, you do not have access to modify this business'
      // });
    });
  }
}

export default BusinessMethods;
