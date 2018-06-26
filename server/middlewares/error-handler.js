const errorHandler = (req, res, next) => {
  const errors = req.validationErrors();
  const errorArray = [];

  if (errors) {
    errors.map((err) => {
      errorArray.push(err.msg)
    })

    return res.status(400).json(errorArray);
  }

  next();
};

export default errorHandler;
