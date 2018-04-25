import models from '../models/index';

const Locations = models.Location;
/**

 *@class
 *
 */
class locationOptions {
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {json} response object gotten
    *@memberof locationOptions
  */
  static getLocations(req, res) {
    const locationArray = [];
    return Locations
      .findAll()
      .then((locations) => {
        if (locations.length === 0) {
          return res.status(404).json({
            message: 'No business location available'
          });
        }

        for (let counter = 0; counter <= locations.length; counter += 1) {
          if (locations[counter]) {
            locationArray.push({
              id: locations[counter].id,
              location: locations[counter].location
            });
          }
        }
        return res.status(200).json({
          locations: locationArray
        });
      });
  }
}

export default locationOptions;
