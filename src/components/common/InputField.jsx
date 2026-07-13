// src/components/common/InputField.jsx
import React from 'react';
import './common.css';

const InputField = ({ label, name, type = 'text', value, onChange, required, readOnly, placeholder, as }) => (
  <div className="input-field">
    {label && <label htmlFor={name}>{label} {required && <span className="required-star">*</span>}</label>}
    {as === 'textarea' ? (
      <textarea id={name} name={name} value={value ?? ''} onChange={onChange} required={required} placeholder={placeholder} rows={4} />
    ) : (
      <input id={name} name={name} type={type} value={value ?? ''} onChange={onChange} required={required} readOnly={readOnly} placeholder={placeholder} />
    )}
  </div>
);

export default InputField;
