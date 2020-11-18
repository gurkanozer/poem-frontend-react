import React from "react";
import TextArea from "../../toolbox/TextArea";

const FormBSide = ({ onChange, poem, onSubmit, cancel, prevStep }) => {
  const enabled = poem.content && poem.content.trim().length > 0;
  return (
    <div className="card-body bg-white">
      <TextArea
        rows="10"
        label="Metin:"
        name="content"
        value={poem.content}
        onChange={onChange}
      />
      <div className="float-right">
        <button className="btn btn-primary mr-1" onClick={prevStep}>
          <i className="fa fa-arrow-left"></i> Geri
        </button>
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
  );
};

export default FormBSide;
