import businesses from '../model/business';

/**
  *
  *Filter function to filter businesses by location or category
  *If any of location or category is provided as query, the filtering takes place
  *@param {any} req - request value - handles data coming from the user
  *@param {any} res - response value - this is the response gotten after
  interaction with the Api routes
  *@param {any} next - next value - this is a middleware reserved keyword
  responsible for allowing other methods or action in line to act only after this pressent
  action has taken place
  *@return {json} response object gotten
*/
export function sortQuery(req, res, next) {
  const { location, category } = req.query;

  if (location || category) {
    const array = [];
    businesses.forEach((business) => {
      if (location === business.location) {
        array.push(business)
      }
      if (category === business.category) {
        array.push(business)
      }
    });

    if (array.length > 0) {return res.status(200).send(array)};
    return res.status(404).json({
      message: 'Business not found',
      error: true
    });
  }

  next();
}

/**
  *
  *Middleware to check if business exists before deletion takes place in the controller
  *@param {any} req - request value - handles data coming from the user
  *@param {any} res - response value - this is the response gotten after
  interaction with the Api routes
  *@param {any} next - next value - this is a middleware reserved keyword
  responsible for allowing other methods or action in line to act only after this pressent
  action has taken place
  *@return {json} response object with error
  *@memberof filterBusiness
*/
export function filterToDelete(req, res, next) {
  const businessId = parseInt(req.params.businessId, 10);
  const filteredBusiness = businesses.filter(business => business.id === businessId)[0];

  if (!filteredBusiness) {
    return res.status(404).json({
      messsage: 'Business not found',
      error: true
    });
  }

  next();
}
