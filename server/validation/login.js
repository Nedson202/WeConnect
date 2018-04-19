import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function loginValidator(data) {
  const errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (data.password.trim().length < 6) {
    errors.password = 'Password must have at least 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
