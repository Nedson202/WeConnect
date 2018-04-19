import React from 'react'
import PropTypes from 'prop-types';
import classcat from 'classcat';
import '../../index.css';

const TextField = ({field, value, label, error, conflictError, placeholder, type, onChange}) => {
  return (
    <div>
      <div className={classcat(["form-group",
         { "has-error": error },
          "col-md-6", "offset-md-3", "col-lg-8", "offset-lg-2",
       ])}
        >
        <label className="control-label" id="control-label">{label}</label>
        <input
          value={value}
          onChange={onChange}
          type={type}
          name={field}
          className="form-control"
          placeholder={placeholder}/>
        {error && <span className="help-block">{error}</span>}
        {conflictError && <span className="help-block">{conflictError}</span>}
      </div>
    </div>
  );
}

TextField.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  conflictError: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

TextField.defaultProps = {
  type: 'text'
}

export default TextField;
