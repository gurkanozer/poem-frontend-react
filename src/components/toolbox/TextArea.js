import React from "react";

const TextArea = ({ rows, label, name, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        className="form-control"
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};
export default TextArea;
