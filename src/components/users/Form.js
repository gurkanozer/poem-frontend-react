import React from "react";
import TextInput from "../toolbox/TextInput";

const Form = ({ user, formTitle, onChange, onSubmit, cancel, nextStep }) => {
  const enabled = user.name && user.name.trim().length > 0;
  return (
    <div className="card bg-light p-0 rounded-0">
      <div className="card-header bg-white">{formTitle}</div>
      <div className="card-body bg-white">
        <TextInput
          name="name"
          type="text"
          placeHolder={user.name ? user.name : "Adınızı giriniz..."}
          value={user.name || ""}
          label="İsim:"
          onChange={onChange}
        />
        <TextInput
          name="email"
          type="email"
          placeHolder={user.email ? user.email : "Eposta adresinizi giriniz..."}
          value={user.email || ""}
          label="Eposta:"
          onChange={onChange}
        />
        <div className="float-right">
          <button className="btn btn-primary ml-2" onClick={nextStep}>
            <i className="fa fa-key"></i> Şifre Değiştir
          </button>
          <button
            disabled={!enabled}
            className="btn btn-success ml-2"
            onClick={onSubmit}
          >
            Kaydet
          </button>
          <button className="btn btn-danger ml-2" onClick={cancel}>
            İptal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
