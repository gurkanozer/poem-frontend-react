import React from "react";
import TextInput from "../toolbox/TextInput";

const Form = ({ author, formTitle, onChange, onSubmit, cancel }) => {
  const enabled = author.name && author.name.trim().length > 0;
  return (
    <div className="card bg-light p-0 rounded-0" onSubmit={onSubmit}>
      <div className="card-header bg-white">
        <h5>{formTitle}</h5>
        <div className="card-body bg-white">
          <TextInput
            name="name"
            type="text"
            placeHolder={author.name ? author.name : "Yazar adını giriniz..."}
            value={author.name || ""}
            label="İsim:"
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
