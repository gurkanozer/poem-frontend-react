import React from "react";

const SelectInput = ({
  name,
  label,
  onChange,
  value,
  options,
  defaultValue,
  optionKey = "name",
}) => {
  const findValue = (object) => {
    for (const [key, value] of Object.entries(object)) {
      if (key === optionKey) return value;
    }
  };
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <select
          name={name}
          className="form-control"
          onChange={onChange}
          placeholder="Lütfen bir seçim yapınız..."
        >
          {defaultValue == null ? (
            <option defaultValue>Lütfen bir seçim yapınız...</option>
          ) : (
            <option>Lütfen bir seçim yapınız...</option>
          )}
          {options.map((option) => (
            <option
              key={parseInt(option.id, 10)}
              value={parseInt(option.id, 10)}
              selected={option.id === defaultValue ? true : false}
            >
              {findValue(option)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default SelectInput;
