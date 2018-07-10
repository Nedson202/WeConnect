import models from '../models';

const Categories = models.Category;
/**
 *@class
 */
class BusinessCategories {
  /**
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {json} response object gotten
    *@memberof BusinessCategories
  */
  static getCategories(req, res) {
    const categoryArray = [];
    // find and return all categories
    return Categories
      .findAll()
      .then((categories) => {
        if (categories.length === 0) {
          return res.status(404).json({
            message: 'No business category available'
          });
        }
        // loop through the categories returned and collect only the category and id
        categories.forEach((businessCategory) => {
          categoryArray.push({
            id: businessCategory.id,
            category: businessCategory.category
          });
        });
        // return the new array of categories
        return res.status(200).json({
          categories: categoryArray
        });
      });
  }
}

export default BusinessCategories;
