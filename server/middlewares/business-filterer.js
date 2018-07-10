import models from '../models';
import errorMessage from './error-message';
import config from '../config/config';

const Businesses = models.Business;
const Users = models.User;

/**
 *@class
 */
class sorter {
  /**
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next
    *@memberof sorter
    *@return {json} response object gotten
  */
  static sortQuery(req, res, next) {
    const { location, category, name } = req.query;

    const limit = 6;
    let page = req.query.page || 1;
    const offset = limit * (page - 1);

    page = parseInt(page, 10);
    const queryData = {};
    // psrse the value in req.query and return it as an object
    if (name) {
      queryData.option = 'name';
      queryData.query = name;
    }
    if (location) {
      queryData.option = 'location';
      queryData.query = location;
    }
    if (category) {
      queryData.option = 'category';
      queryData.query = category;
    }

    // check if location, category is provided and filter business list accordingly
    if (location || category || name) {
      return Businesses.findAndCountAll({
        limit,
        offset,
        where: {
          // filters business list using whatever data is provided
          $or: [
            {
              location: {
                $iLike: `${location}%`
              }
            },
            {
              category: {
                $iLike: `${category}%`
              }
            },
            {
              name: {
                $iLike: `${name}%`
              }
            }
          ]
        }
      })
        .then((businesses) => {
          // return empty array if no match is found
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
                BusinessOnPage: businesses.rows.length,
                queryData
              }
            }
          });
        });
    }
    // this calls the next function in line
    next();
  }
  /**
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next
    *@memberof sorter
    *@return {json} response object gotten
  */
  static checkBusiness(req, res, next) {
    const { businessId } = req.params;
    const { id } = req.body;
    // const { userId, username } = req.decoded;
    // middleware that searches for a business by its id
    return Businesses.findById(parseInt(businessId, 10))
      .then((business) => {
        // return error message if no match is found
        if (!business) {
          return errorMessage(res);
        }
        // return error message if user tries to update business id or owner id
        if (id) {
          return res.status(400).json({
            message: 'UserId and business id can not be updated',
            error: true
          });
        }
        // set business data to req so the next function can use it
        req.business = business;
        // this calls the next function in line
        next();
      })
      // return unhandled event
      .catch(error => res.status(500).json({
        message: error.message,
        error: true
      }));
  }
  /**
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next
    *@memberof sorter
    *@return {json} response object gotten
  */
  static checkUser(req, res, next) {
    const userId = parseInt(req.params.userId, 10);
    const { username, email } = req.decoded;
    // find a user by id
    return Users.findById(userId).then((user) => {
      // return message if no user is found
      if (!user) {
        return res.status(404).json({
          message: 'user not found',
          error: true
        });
      }
      // return error message if the user is unauthorized
      if (username !== config.admin && email !== config.adminEmail) {
        return res.status(403).json({
          message: 'Forbidden, you do not have access to view all users',
          error: true
        });
      }
      // set user data to req so the next function can use it
      req.user = user;
      // this calls the next function in line
      next();
    })
    // return unhandled event
      .catch(error => res.status(500).json({
        message: error.message,
        error: true
      }));
  }
}

export default sorter;
