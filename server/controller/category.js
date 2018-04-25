import models from '../models/index';

const Categories = models.Category;
/**

 *@class
 *
 */
class BusinessCategories {
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {json} response object gotten
    *@memberof BusinessCategories
  */
  static getCategories(req, res) {
    const categoryArray = [];
    return Categories
      .findAll()
      .then((categories) => {
        if (categories.length === 0) {
          return res.status(404).json({
            message: 'No business category available'
          });
        }

        for (let counter = 0; counter <= categories.length; counter += 1) {
          if (categories[counter]) {
            categoryArray.push({
              id: categories[counter].id,
              category: categories[counter].category
            });
          }
        }
        return res.status(200).json({
          categories: categoryArray
        });
      });
  }
}

export default BusinessCategories;
