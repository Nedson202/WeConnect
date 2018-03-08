import businesses from '../model/business';
/**
  *
  *Business filterer
  *@class
  *
*/
class filterBusiness {
  /**
    *
    *Filter business by category
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@param {any} next - next value - this is a middleware reserved keyword
    responsible for allowing other methods or action in line to act only after this pressent
    action has taken place
    *@return {json} response object gotten
    *@memberof filterBusiness
  */
  static filterByLocation(req, res, next) {
    let filteredBusiness;

    const { location } = req.query;

    if (location) {
      filteredBusiness = businesses.filter(business =>
        location.toLowerCase() === business.location);
      if (filteredBusiness.length === 0) {
        res.status(404).json({
          message: 'Business not found',
          error: true
        });
      }
      res.status(200).json(filteredBusiness);
    }

    next();
  }
  /**
    *
    *Filter business by category
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@param {any} next - next value - this is a middleware reserved keyword
    responsible for allowing other methods or action in line to act only after this pressent
    action has taken place
    *@return {json} response object gotten
    *@memberof filterBusiness
  */
  static filterByCategory(req, res, next) {
    let filteredBusiness;

    const { category } = req.query;

    if (category) {
      filteredBusiness = businesses.filter(business =>
        category.toLowerCase() === business.category);
      if (filteredBusiness.length === 0) {
        res.status(404).json({
          message: 'Business not found',
          error: true
        });
      }
      res.status(200).json(filteredBusiness);
    }

    next();
  }
}

export default filterBusiness;
