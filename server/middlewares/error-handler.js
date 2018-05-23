const errorHandler = (req, res, next) => {
  const errors = req.validationErrors();
  const errorObject = {};

  if (errors) {
    errors.map((err) => {
      errorObject[err.param] = err.msg;
    })

    return res.status(400).json(errorObject);
  }

  next();
};

export default errorHandler;
