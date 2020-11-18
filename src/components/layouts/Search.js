import React from "react";
import { Link } from "react-router-dom";

const Search = ({ value, placeholder, link, onClick, onChange, ...props }) => {
  return (
    <div className="input-group my-3 bg-white">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        aria-describedby="search"
        name="search"
        value={value}
        onChange={onChange}
      />
      <div className="input-group-append" id="search">
        <button className="btn btn-success" type="button" onClick={onClick}>
          <i className="fa fa-search"></i>
        </button>
        <Link to={link} className="btn btn-outline-info">
          <i className="fa fa-plus"></i> Yeni Kayıt Oluştur
        </Link>
      </div>
    </div>
  );
};

export default Search;
