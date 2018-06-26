import models from '../models/index';
import errorMessage from '../middlewares/error-message';

const Businesses = models.Business;
const Users = models.User;
const Reviews = models.Review;
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

    // const conflict = [];

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
      .then(business => res.status(201).json({
        message: 'Business registration successful',
        error: false,
        business
      }))
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

    return Businesses
      .findAndCountAll({
        limit,
        offset,
        include: [{
          model: Users,
          as: 'businessOwner',
          attributes: ['username']
        }]
      })
      .then((businesses) => {
        if(businesses.rows.length === 0) {
          return res.status(200).json({ businesses: businesses.rows });
        }

        const { count } = businesses;
        const totalPages = Math.ceil(count / limit);

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
    // return Businesses.findById(req.params.businessId)
    const { businessId } = req.params;
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
        if (business === null) {
          return errorMessage(res);
        }

        let ratings = 0;
        const noOfRaters = business.businessReviews.length;
        // console.log(business.Rev);
        business.businessReviews.map(rating => ratings += rating.rating);
        // business.businessReviews.map(rating => ({
        //   ratings += rating.rating;
        // }));

        const averageRating = ratings / noOfRaters;
        // business.rating = aveRating
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
          averageRating: averageRating || 0
        };


        return res.status(200).json({
          business: [oneBusiness],
          error: false
        });
      })
      .catch(error => res.status(500).json({
        message: error.message,
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
    const limit = 6;
    let page = req.query.page || 1;
    const offset = limit * (page - 1);

    page = parseInt(page, 10);

    const { userId } = req.params;
    return Businesses.findAndCountAll({
      where: {
        userId: parseInt(userId, 10)
      },
      limit,
      offset,
    })
      .then((businesses) => {
        if (businesses.rows.length === 0) {
          return res.status(200).json({ businesses: businesses.rows });
        }

        const { count } = businesses;
        const totalPages = Math.ceil(count / limit);

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
      .catch(error => {
        return res.status(500).json({
          message: error.message,
          error: true
      })});
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {json} response object gotten
    *@memberof BusinessMethods
  */
  static updateBusiness(req, res) {
    // const conflict = [];
    const { business } = req

    // const businessId = parseInt(req.params.businessId, 10);
    // return Businesses.findById(businessId)
    //   .then((business) => {
    //     if (business.userId !== req.decoded.userId) {
    //       return res.status(403).json({
    //         message: 'Forbidden, you do not have access to modify this business',
    //         error: true
    //       });
    //     }

        business.update({
          name: req.body.name || business.name,
          email: req.body.email || business.email,
          address: req.body.address || business.address,
          location: req.body.location || business.location,
          category: req.body.category || business.category,
          description: req.body.description || business.description,
          image: req.body.image || business.image,
        })
          .then(() => res.status(200).json({
            message: 'Business updated successfully',
            error: false,
            business
          }))
          // .catch((error) => {
          //   if (error.errors[0].path === 'name') {
          //     conflict.push('Business with name is already registered');
          //   }

          //   return res.status(409).json(conflict);
          // });
          .catch(error => res.status(409).json([error.errors[0].message]));
      // });
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {json} response object gotten
    *@memberof BusinessMethods
  */
  static updateBusinessImage(req, res) {
    // const businessId = parseInt(req.params.businessId, 10);
    const { business } = req

    // return Businesses.findById(businessId)
    //   .then((business) => {
        business.update({
          image: req.body.image || business.image,
        })
          .then(() => {
            return res.status(200).json({
            message: 'Image uploaded successfully',
            error: false,
            business
          })})
      // });
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
    });
  }
}

export default BusinessMethods;
