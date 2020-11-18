import React from "react";
import TextInput from "../../toolbox/TextInput";
import SelectInput from "../../toolbox/SelectInput";

const FormASide = ({
  poem,
  authors,
  genres,
  selectHandler,
  titlePlaceHolder,
  onChange,
  nextStep,
  cancel,
}) => {
  const enabled = poem.title && poem.title.trim().length > 0 && poem.author_id;
  return (
    <div className="card-body bg-white">
      <TextInput
        name="title"
        type="text"
        placeHolder={poem.title ? poem.title : titlePlaceHolder}
        value={poem.title || ""}
        label="İsim:"
        onChange={onChange}
      />
      <SelectInput
        name="author_id"
        label="Yazar:"
        options={authors}
        optionKey="name"
        onChange={selectHandler}
        defaultValue={poem.author_id}
      />
      <SelectInput
        name="genre_id"
        label="Kategori:"
        options={genres}
        optionKey="title"
        onChange={selectHandler}
        //Veri tabanında genre_id strnig olarak eklenmiş id'yi integer'a çevirmek gerekiyor
        defaultValue={parseInt(poem.genre_id, 10)}
      />
      <div className="float-right">
        <button className="btn btn-danger  mr-1" onClick={cancel}>
          İptal
        </button>
        <button
          className="btn btn-primary"
          onClick={nextStep}
          disabled={!enabled}
        >
          Devam Et <i className="fa fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default FormASide;
