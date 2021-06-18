import React from "react";

const Input = ({ name, value, label, onChange, error }) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        onChange={onChange}
        value={value}
        id={name}
        name={name}
        type="text"
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
