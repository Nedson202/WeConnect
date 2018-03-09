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
  /**
    *
    *Display all business
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@return {json} response object gotten
    *@memberof Businesses
  */
  static getBusiness(req, res) {
    return res.status(200).json({
      businesses,
      error: 'false'
    });
  }
  /**
    *
    *Get a business by id
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@return {json} response object gotten
    *@memberof filterBusiness
  */
  static getOneBusiness(req, res) {
    const businessId = parseInt(req.params.businessId, 10);
    const filteredBusiness = businesses.filter(business => business.id === businessId)[0];

    if (!filteredBusiness) {
      res.status(404).json({
        messsage: 'Business not found',
        error: true
      });
    }

    res.status(200).json(filteredBusiness);
  }
  /**
    *
    *Update a business by id
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@return {json} response object gotten
    *@memberof Businesses
  */
  static updateBusiness(req, res) {
    const {
      name, email, address, location, category
    } = req.body;

    const businessId = parseInt(req.params.businessId, 10);
    const filteredBusiness = businesses.filter(business => business.id === businessId)[0];

    if (!filteredBusiness) {
      res.status(404).json({
        messsage: 'Business not found',
        error: true
      });
    }

    filteredBusiness.name = name || filteredBusiness.name;
    filteredBusiness.email = email || filteredBusiness.email;
    filteredBusiness.address = address || filteredBusiness.address;
    filteredBusiness.location = location || filteredBusiness.location;
    filteredBusiness.category = category || filteredBusiness.category;

    return res.status(201).json({
      message: 'Business profile updated',
      error: false
    });
  }
  /**
    *
    *Delete a business by id
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@return {status} response object gotten
    *@memberof Businesses
  */
  static deleteBusiness(req, res) {
    const businessId = parseInt(req.params.businessId, 10);

    for (let i = 0; i <= businesses.length; i += 1) {
      if (businessId === businesses[i].id) {
        businesses.splice(i, 1);
        res.sendStatus(204);
      }
    }
  }
}

export default Businesses;
