import React, { useState } from "react";
import FormASide from "./FormASide";
import FormBSide from "./FormBSide";

const Form = ({
  poem,
  authors,
  genres,
  formTitle,
  onChange,
  onSubmit,
  selectHandler,
  cancel,
  ...props
}) => {
  const [step, setStep] = useState(1);
  //Next step sonraki sayfaya geçmek için
  const nextStep = () => {
    setStep((step) => step + 1);
  };
  //Prev step önceki sayfaya dönmek için
  const prevStep = () => {
    setStep((step) => step - 1);
  };

  switch (step) {
    case 1:
      return (
        <div className="card bg-light p-0 rounded-0" onSubmit={onSubmit}>
          <div className="card-header bg-white">
            <h5>{formTitle}</h5>
          </div>
          <FormASide
            poem={poem}
            authors={authors}
            genres={genres}
            nextStep={nextStep}
            titlePlaceHolder="Şiir başlığını giriniz"
            selectHandler={selectHandler}
            onChange={onChange}
            cancel={cancel}
          />
        </div>
      );
    case 2:
      return (
        <div className="card bg-light p-0 rounded-0">
          <div className="card-header bg-white">
            <h5>{formTitle}</h5>
          </div>
          <FormBSide
            poem={poem}
            prevStep={prevStep}
            cancel={cancel}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </div>
      );
    default:
      break;
  }
};

export default Form;
