import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames'

const FormField = ({name,placeholder,value
,label,error,info,type,onChange,disabled}) => {
    return (
        <div className="form-group">
        <input
          type= {type}
          className={classnames('form-control form-control-lg', {
            'is-invalid': error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled = {disabled}
        />
        {info && 
          <small className="form-text text-muted">{info}</small>
        }
        {error && 
          <div className="invalid-feedback">{error}</div>
        }
      </div>
    );
}

FormField.propTypes = {
    name: propTypes.string.isRequired,
    placeholder: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    info: propTypes.string.isRequired,
    error: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    disabled: propTypes.string
}

//
FormField.defaultProps ={
    type: 'text'
}

export default FormField;
