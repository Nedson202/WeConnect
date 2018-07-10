import models from '../models';

const Locations = models.Location;
/**
 *@class
 */
class locationOptions {
  /**
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {json} response object gotten
    *@memberof locationOptions
  */
  static getLocations(req, res) {
    const locationArray = [];
    // find and return all locations
    return Locations
      .findAll()
      .then((locations) => {
        if (locations.length === 0) {
          return res.status(404).json({
            message: 'No business location available'
          });
        }
        // loop through the locations returned and collect only the location and id
        locations.forEach((businessLocation) => {
          locationArray.push({
            id: businessLocation.id,
            location: businessLocation.location
          });
        });
        // return the new array of locations
        return res.status(200).json({
          locations: locationArray
        });
      });
  }
}

export default locationOptions;
