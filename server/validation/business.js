import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function businessValidator(data) {
  const errors = {};

  if (Validator.isEmpty(data.name)) {
    errors.name = 'This field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = 'This field is required';
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = 'This field is required';
  }
  if (Validator.isEmpty(data.category)) {
    errors.category = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
