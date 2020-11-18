import React from "react";

const TextInput = ({
  name,
  label,
  onChange,
  type,
  placeHolder,
  value,
  error,
  ref,
}) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }
  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type={type}
          name={name}
          className="form-control"
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          ref={ref}
        ></input>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
export default TextInput;
