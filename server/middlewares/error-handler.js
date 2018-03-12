const errorHandler = (req, res, next) => {
  const errors = req.validationErrors();

  if (errors) {
    res.status(400).json({
      message: errors[0].msg,
      error: true
    });
  }
  next();
};

export default errorHandler;
