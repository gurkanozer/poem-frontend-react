import React from "react";
import TextInput from "../toolbox/TextInput";

const PasswordForm = ({
  user,
  formTitle,
  onChange,
  onSubmit,
  cancel,
  prevStep,
}) => {
  const enabled = user.name && user.name.trim().length > 0;
  return (
    <div className="card bg-light p-0 rounded-0">
      <div className="card-header bg-white">{formTitle}</div>
      <div className="card-body bg-white">
        <TextInput
          name="password"
          type="password"
          placeHolder="Şifre giriniz."
          value={user.password || ""}
          label="Şifre:"
          onChange={onChange}
        />
        <TextInput
          name="password_confirmation"
          type="password"
          placeHolder="Şifre tekrar."
          value={user.password || ""}
          label="Şifre Kontrol:"
          onChange={onChange}
        />
        <div className="float-right">
          <button className="btn btn-primary ml-2" onClick={prevStep}>
            <i className="fa fa-arrow-left"></i> Geri
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

export default PasswordForm;
