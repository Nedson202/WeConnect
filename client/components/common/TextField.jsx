import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({
  field, value, label, placeholder, type, onChange
}) => (
  <div>
    <div className="form-group col-md-6 offset-md-3 col-lg-8 offset-lg-2">
      <label className="control-label" id="control-label">{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        name={field}
        className="form-control"
        placeholder={placeholder}
      />
    </div>
  </div>
);

TextField.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TextField;
