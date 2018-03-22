const regex = (res, category) => {
  const categoryRegex = parseInt(category.replace(/[^0-9]/g, ''), 10);
  if (Number.isNaN(categoryRegex)) {
    return res.status(400).json({
      message: 'category entered is invalid',
      help: 'example of a valid category is 5-finance',
      error: true
    });
  }
};

export default regex;
