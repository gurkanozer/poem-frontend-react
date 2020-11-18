import React from "react";
import TextInput from "../toolbox/TextInput";

const Form = ({ genre, formTitle, onChange, onSubmit, cancel }) => {
  const enabled = genre.title && genre.title.trim().length > 0;
  return (
    <div className="card bg-light p-0 rounded-0" onSubmit={onSubmit}>
      <div className="card-header bg-white">
        <h5>{formTitle}</h5>
        <div className="card-body bg-white">
          <TextInput
            name="title"
            type="text"
            placeHolder={genre.title ? genre.title : "Kategori giriniz..."}
            value={genre.title || ""}
            label="Kategori:"
            onChange={onChange}
          />
          <div className="float-right">
            <button
              disabled={!enabled}
              className="btn btn-success mr-1"
              onClick={onSubmit}
            >
              Kaydet
            </button>
            <button className="btn btn-danger" onClick={cancel}>
              İptal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
