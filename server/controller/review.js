import businesses from '../model/business';
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
    const filteredBusiness = businesses.filter(business => business.id === businessId)[0];

    if (!filteredBusiness) {
      res.status(404).send({
        message: 'Business not found, no review posted',
        error: true
      });
    }

    if ((reviewer.length && message.length) >= 1) {
      filteredBusiness.reviews.reviewer.push(reviewer);
      filteredBusiness.reviews.message.push(message);
    }

    res.status(201).json({
      message: 'Review posted successfully',
      error: false
    });
  }
}

export default Reviews;
