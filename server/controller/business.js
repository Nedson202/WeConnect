import businesses from '../model/business';
/**
  *
  *Business class to handle actions like registration, business filtering
  *updating business, retrieving business, deletion of business
  *@class
  *
*/
class Businesses {
  /**
    *
    *Register business
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@return {json} response object gotten
    *@memberof Businesses
  */
  static createBusiness(req, res) {
    const {
      name, email, address, location, category
    } = req.body;

    const filteredBusiness = businesses.filter(business => business.name === name)[0];

    if (filteredBusiness) {
      res.status(400).json({
        message: 'Business with name, is already taken',
        error: true
      });
    }

    if (!filteredBusiness) {
      businesses.push({
        id: businesses[businesses.length - 1].id + 1,
        name,
        email,
        address,
        location,
        category
      });
    }

    return res.status(201).json({
      message: 'Business registration successful',
      error: 'false'
    });
  }
}

export default Businesses;
