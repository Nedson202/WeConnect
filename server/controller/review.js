import models from '../models/index';
import errorMessage from '../middlewares/error-message';

const Reviews = models.Review;
const Businesses = models.Business;
const Users = models.User;
/**
  *
  *@class
  *
*/
class businessReviews {
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {status} response object gotten
    *@memberof businessReviews
  */
  static postReview(req, res) {
    const { businessId } = req.params;
    const { message, rating } = req.body;

    // return Businesses.findById(parseInt(businessId))
    //   .then((business) => {
    //     if (business === null) {
    //       return errorMessage(res);
    //     }

    return Reviews.create({
      userId: req.decoded.userId,
      message,
      rating: parseInt(rating, 10),
      businessId,
    })
      .then(postedReview => res.status(201).json({
        message: 'Review posted successfully',
        error: false,
        review: {
          id: postedReview.id,
          message: postedReview.message,
          createdAt: postedReview.createdAt,
          reviewer: {
            username: req.decoded.username
          }
        }
      }));
    // .catch(error => res.status(500).json({
    //   message: error.message,
    //   error: true
    // }));
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {status} response object gotten
    *@memberof businessReviews
  */
  static getReview(req, res) {
    const { businessId } = req.params;

    const limit = 6;
    let page = req.query.page || 1;
    const offset = limit * (page - 1);

    page = parseInt(page, 10);


    return Businesses.findById(businessId)
      .then((business) => {
        if (business === null) {
          return errorMessage(res);
        }

        Reviews.findAndCountAll({
          where: {
            businessId
          },
          order: [
            ['updatedAt', 'DESC']
          ],
          limit,
          offset,
          include: [{
            model: Users,
            as: 'reviewer',
            attributes: ['username', 'image']
          }]
        })
          .then((reviews) => {
            if (reviews.rows.length === 0) {
              return res.status(200).json({ reviews: reviews.rows });
            }

            const { count } = reviews;
            const totalPages = Math.ceil(count / limit);

            return res.status(200).json({
              allData: {
                reviews: reviews.rows,
                paginatedReviewResult: {
                  limit,
                  totalPages,
                  totalReviews: count,
                  page,
                  ReviewsOnPage: reviews.rows.length
                }
              },
              error: false
            });
          });
      }).catch(error => {
          return res.status(500).json({
            message: error.message,
            error: true
      })});
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {status} response object gotten
    *@memberof businessReviews
  */
  static deleteReview(req, res) {
    const { reviewId } = req.params;

    return Reviews.destroy({
      where: {
        id: reviewId
      }
    }).then(() => res.status(200).json({
      message: 'Review deleted successfully'
    }));
  }
}

export default businessReviews;
