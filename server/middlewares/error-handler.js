// function to handle error from inout validation
const errorHandler = (req, res, next) => {
  const errors = req.validationErrors();
  const errorArray = [];

  if (errors) {
    errors.map(err => errorArray.push(err.msg));
    // return an array of errors found
    return res.status(400).json(errorArray);
  }
  // switch to the next function in line
  next();
};

export default errorHandler;
