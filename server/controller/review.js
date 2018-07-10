import models from '../models';
import errorMessage from '../middlewares/error-message';

const Reviews = models.Review;
const Businesses = models.Business;
const Users = models.User;
/**
  *@class
  *
*/
class businessReviews {
  /**
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {status} response object gotten
    *@memberof businessReviews
  */
  static postReview(req, res) {
    const { businessId } = req.params;
    const { message, rating } = req.body;
    // post a review
    return Reviews.create({
      userId: req.decoded.userId,
      message,
      rating: parseFloat(rating, 10),
      businessId,
    })
    // return success message and posted review
      .then(postedReview => res.status(201).json({
        message: 'Review posted successfully',
        error: false,
        review: {
          id: postedReview.id,
          rating: postedReview.rating,
          message: postedReview.message,
          createdAt: postedReview.createdAt,
          reviewer: {
            username: req.decoded.username
          }
        }
      }))
    // return any errors
      .catch(error => res.status(500).json({
        message: error.message,
        error: true
      }));
  }
  /**
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {status} response object gotten
    *@memberof businessReviews
  */
  static getReview(req, res) {
    const { businessId } = req.params;
    const limit = 4;
    let page = req.query.page || 1;
    const offset = limit * (page - 1);

    page = parseInt(page, 10);
    // find a business and return the reviews posted on the business
    return Businesses.findById(businessId)
      .then((business) => {
        if (business === null) {
          return errorMessage(res);
        }
        // find all reviews and display them in batches using ?page={number}
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
          // return empty array if no review is found
            if (reviews.rows.length === 0) {
              return res.status(200).json({ reviews: reviews.rows });
            }
            const { count } = reviews;
            // generate the total number of pages that the business found will span
            const totalPages = Math.ceil(count / limit);
            // return review data and information regarding pagination of result
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
      })
      // return unhandled errors
      .catch(error => res.status(500).json({
        message: error.message,
        error: true
      }));
  }
  /**
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {status} response object gotten
    *@memberof businessReviews
  */
  static updateReview(req, res) {
    const { review } = req;
    // update a review
    return review.update({
      message: req.body.editMessage || review.message,
      rating: req.body.editRating || review.rating
    })
      // return success message and review updated
      .then(updateReview => res.status(200).json({
        message: 'Review updated successfully',
        error: false,
        updateReview
      }));
  }
  /**
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {status} response object gotten
    *@memberof businessReviews
  */
  static deleteReview(req, res) {
    const { reviewId } = req.params;
    // delete a review by its id
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
