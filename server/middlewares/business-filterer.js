import models from '../models/index';

const Businesses = models.Business;

/**
 *
 *@class
 *
 */
class sorter {
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next
    *@memberof sorter
    *@return {json} response object gotten
  */
  static sortQuery(req, res, next) {
    const { location, category } = req.query;

    if (location || category) {
      Businesses.findAll({
        where: {
          // $or: [{ location }, { category }]
          $or: [
            {
              location: {
                ilike: `%${location}%`
              }
            },
            {
              category: {
                ilike: `%${category}%`
              }
            }
          ]
        }
      })
        .then((business) => {
          if (business.length < 1) {
            return res.status(404).json({
              message: 'Business not found',
              error: true
            });
          }

          return res.status(200).json({
            business,
            error: false
          });
        });
    }

    next();
  }
}

export default sorter;
