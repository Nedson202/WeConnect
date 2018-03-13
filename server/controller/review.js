import businesses from '../model/business';

const errorMessage = res => res.status(404).json({
  message: 'Business not found, no review gotten',
  error: true
});
/**
  *
  *Review class to handle review posting and getting all reviews for a business
  *@class
  *
*/
class Reviews {
  /**
    *
    *post reviews for a business
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@return {status} response object gotten
    *@memberof Businesses
  */
  static postReview(req, res) {
    const { reviewer, message } = req.body;
    const businessId = parseInt(req.params.businessId, 10);

    for (let i = 0; i < businesses.length; i += 1) {
      if (businessId === businesses[i].id) {
        businesses[i].reviews.push({
          reviewer,
          message
        });
        return res.status(201).json({
          message: 'Review posted successfully',
          error: false
        });
      }
    }

    return errorMessage(res);
  }
  /**
    *
    *gets all reviews under a business
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@return {status} response object gotten
    *@memberof Businesses
  */
  static getReview(req, res) {
    const businessId = parseInt(req.params.businessId, 10);

    for (let i = 0; i < businesses.length; i += 1) {
      if (businessId === businesses[i].id) {
        return res.status(200).json(businesses[i].reviews);
      }
    }

    return errorMessage(res);
  }
}

export default Reviews;
