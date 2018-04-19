import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function signupValidator(data) {
  const errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
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
